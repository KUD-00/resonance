variable "domains" {
  description = "A map of domain names to lists of services. Each service is defined by a map including the service name, port, and path."
  type = map(list(object({
    name = string
    port = number
    path = string
  })))
}
