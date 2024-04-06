variable "api_name" {
  description = "The name of the API Gateway"
  type        = string
}

variable "api_description" {
  description = "The description of the API Gateway"
  type        = string
}

variable "stage_name" {
  description = "The stage name of the API Gateway"
  type        = string
}

variable "domain" {
  description = "The custom domain name for the API Gateway"
  type        = string
}

variable "arn" {
  description = "The ARN of the ACM certificate for the custom domain"
  type        = string
}

variable "services" {
  description = "A list of service configurations"
  type = list(object({
    path_part = string
    uri       = string
    methods   = list(string)
  }))
}
