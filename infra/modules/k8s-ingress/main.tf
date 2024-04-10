resource "kubernetes_ingress_v1" "ingress" {
  metadata {
    name        = "ingress"
    annotations = {
      "kubernetes.io/ingress.class" = "nginx"
    }
  }

  spec {
    dynamic "rule" {
      for_each = var.domains

      content {
        host = rule.key
        http {
          dynamic "path" {
            for_each = rule.value

            content {
              path      = path.value.path
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
}
