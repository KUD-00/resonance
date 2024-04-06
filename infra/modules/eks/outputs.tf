output "cluster_name" {
  value       = aws_eks_cluster.cluster.name
  description = "EKS 集群的名称"
}

output "cluster_arn" {
  value       = aws_eks_cluster.cluster.arn
  description = "EKS 集群的 ARN"
}

output "cluster_endpoint" {
  value       = aws_eks_cluster.cluster.endpoint
  description = "EKS 集群的端点"
}

output "cluster_certificate_authority" {
  value       = aws_eks_cluster.cluster.certificate_authority
  description = "EKS 集群的证书颁发机构"
}
