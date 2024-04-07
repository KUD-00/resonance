variable "name" {
  description = "The name to use for all resources created by this module"
  type        = string
}

variable "image" {
  description = "The Docker image to run"
  type        = string
}

variable "replicas" {
  description = "How many replicas to run"
  type        = number
}

variable "environment_variables" {
  description = "Environment variables to set for the app"
  type        = map(string)
  default     = {}
}

variable "service_type" {
  description = "The type of service to create"
  type        = string
  default     = "LoadBalancer"
}

variable "port" {
  description = "A list of maps, each containing the port configuration"
  type = list(object({
    name = string
    container_port = number
    service_port = number
  }))
} 
