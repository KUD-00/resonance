resource "kubernetes_ingress_v1" "ingress" {
  metadata {
    name        = "ingress"
    annotations = {
      "kubernetes.io/ingress.class" = "nginx"
    }
  }

  spec {
    rule {
      host = var.domain
      http {
        dynamic "path" {
          for_each = var.services

          content {
            path     = path.value.path
            path_type = "Prefix"
            backend {
              service {
                name = path.value.name
                port {
                  number = path.value.port
                }
              }
            }
          }
        }
      }
    }
  }
}
