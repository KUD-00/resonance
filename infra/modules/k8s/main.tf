terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

locals {
  pod_labels = {
    app = var.name
  }
}

resource "kubernetes_deployment" "app" {
  metadata {
    name = var.name
  }

  spec {
    replicas = var.replicas

    selector {
      match_labels = local.pod_labels
    }

    template {
      metadata {
        labels = local.pod_labels
      }

      spec {
        container {
          name  = var.name
          image = var.image
          image_pull_policy = "Always"

          dynamic "port" {
            for_each = var.port
            content {
              container_port = port.value["container_port"]
            }
          }

          dynamic "env" {
            for_each = var.environment_variables
            content {
              name  = env.key
              value = env.value
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "app" {
  metadata {
    name = var.name
  }

  spec {
    type = var.service_type

    dynamic "port" {
      for_each = var.port
      content {
        name       = port.value["name"]
        port       = port.value["service_port"]
        target_port = port.value["container_port"]
        protocol   = "TCP"
      }
    }

    selector = local.pod_labels
  }
}