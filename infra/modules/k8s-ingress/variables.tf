variable "domain" {
  description = "The domain name for the ingress to use."
  type        = string
}

variable "services" {
  description = "A list of services that the ingress will route to."
  type = list(object({
    name = string
    port = number
    path = string
  }))
}
