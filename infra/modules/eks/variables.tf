variable "name" {
  description = ""
  type        = string
}

variable "min_size" {
  description = "EKS 集群中拥有的最小节点数"
  type        = number
}

variable "max_size" {
  description = "EKS 集群中拥有的最大节点数"
  type        = number
}

variable "desired_size" {
  description = "EKS 集群中期望的节点数"
  type        = number
}

variable "instance_types" {
  description = "在节点组中运行的 EC2 实例类型"
  type        = list(string)
}
