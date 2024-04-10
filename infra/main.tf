terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  # Tokyo
  region = "ap-northeast-1"
}

# We need to authenticate to the EKS cluster, but only after it has been created. We accomplish this by using the
# aws_eks_cluster_auth data source and having it depend on an output of the eks-cluster module.

provider "kubernetes" {
  host = module.eks_cluster.cluster_endpoint
  cluster_ca_certificate = base64decode(
    module.eks_cluster.cluster_certificate_authority[0].data
  )
  token = data.aws_eks_cluster_auth.cluster.token
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks_cluster.cluster_name
}

module "eks_cluster" {
  source = "./modules/eks"

  name = "resonance"

  min_size     = 1
  max_size     = 2
  desired_size = 1

  # Due to the way EKS works with ENIs, t3.small is the smallest
  # instance type that can be used for worker nodes. If you try
  # something smaller like t2.micro, which only has 4 ENIs,
  # they'll all be used up by system services (e.g., kube-proxy)
  # and you won't be able to deploy your own Pods.
  instance_types = ["t3.small"]
}

resource "aws_route53_zone" "my_zone" {
  name = "kud.me"
}

resource "aws_route53_record" "resonance_alb_a_record" {
  zone_id = aws_route53_zone.my_zone.zone_id
  name    = "resonance.kud.me"
  type    = "A"

// TODO: make this read from the output
  alias {
    name                   = "a8bfa593d575443bea86a01f477d7deb-445a98d2bf55def7.elb.ap-northeast-1.amazonaws.com"
    zone_id                = "Z31USIVHYNEOWT"
    evaluate_target_health = true
  }
}

module "nginx-controller" {
  source  = "terraform-iaac/nginx-controller/helm"

  additional_set = [
    {
      name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-type"
      value = "nlb"
      type  = "string"
    },
    {
      name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-cross-zone-load-balancing-enabled"
      value = "true"
      type  = "string"
    }
  ]
}

module "redis-service" {
  source = "./modules/k8s"

  name = "redis"

  image          = "redis:alpine"
  replicas       = 1
  service_type = "ClusterIP"

  port = [
    {
      name = "redis"
      container_port = 6379
      service_port = 6379
    }
  ]

  environment_variables = {
    PROVIDER = "Terraform"
  }
}

module "info-service" {
  source = "./modules/k8s"

  name = "info"

  image          = "ghcr.io/kud-00/resonance/info:main"
  replicas       = 1

  port = [
    {
      name = "http"
      container_port = 8080
      service_port = 80
    },
    {
      name = "grpc"
      container_port = 50051
      service_port = 50051
    }
  ]

  environment_variables = {
    PROVIDER = "Terraform"
  }

  depends_on = [
    module.redis-service
  ]
}

module "calculate-service" {
  source = "./modules/k8s"

  name = "calculate"

  image          = "ghcr.io/kud-00/resonance/calculate:main"
  replicas       = 1
  port = [
    {
      name = "http",
      container_port = 80
      service_port = 80
    }
  ]

  environment_variables = {
    PROVIDER = "Terraform"
  }

  depends_on = [
    module.info-service
  ]
}

module "frontend-service" {
  source = "./modules/k8s"

  name = "frontend"

  image          = "ghcr.io/kud-00/resonance/frontend:main"
  replicas       = 1
  port = [
    {
      name = "http",
      container_port = 8080
      service_port = 80
    }
  ]

  environment_variables = {
    PROVIDER = "Terraform"
  }

  depends_on = [
    module.calculate-service
  ]
}

module "k8s_ingress" {
  source = "./modules/k8s-ingress"

  domains = {
    "resonance.kud.me" = [
      {
        name = "frontend"
        port = 80
        path = "/"
      },
    ],
    "api.resonance.kud.me" = [
      {
        name = "info"
        port = 80
        path = "/goods"
      },
      {
        name = "calculate"
        port = 80
        path = "/calculate"
      }
    ]
  }
}


/* module "api-gateway" {
  source = "./modules/api-gateway"
  api_name        = "Resonance-API"
  api_description = "API for multiple services in resonance"
  stage_name      = "v1"
  domain = "api.resonance.rughzenhaide.com"
  arn = "arn:aws:acm:ap-northeast-1:585815815211:certificate/f766e45a-cbe2-4b52-b5ef-1610bf4a1227"

  services = [
    {
      path_part = "goodsinfo"
      uri       = "http://service1.your-eks-cluster.com"
      methods   = ["GET", "POST"]
    },
    {
      path_part = "route"
      uri       = "http://service2.your-eks-cluster.com"
      methods   = ["GET"]
    }
  ]
}
 */

/* resource "aws_route53_zone" "resonance" {
  name = "resonance.rughzenhaide.com"
}

resource "aws_route53_record" "resonance" {
  zone_id = aws_route53_zone.resonance.zone_id
  name    = "api.resonance.rughzenhaide.com"
  type    = "CNAME"
  ttl     = "300"
  records = ["your-ingress-controller-external-dns-name.amazonaws.com"]
} */