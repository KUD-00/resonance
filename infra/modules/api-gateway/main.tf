// RestAPI 资源 和 API Gateway资源，两两一一对应
// domain资源是绑定到RestAPI 资源上的
// RestAPI资源下面有很多aws_api_gateway_resource，对应一个path
// aws_api_gateway_method 定义了API网关中的一个特定HTTP方法（如GET或POST）在特定资源上的配置
// aws_api_gateway_integration 定义了一个API方法与后端（如Lambda函数、HTTP终点等）之间的集成

locals {
  services_flat = { for svc in var.services : "${svc.path_part}" => svc }
}

resource "aws_api_gateway_rest_api" "api" {
  name        = var.api_name
  description = var.api_description
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = var.stage_name
}

resource "aws_api_gateway_domain_name" "domain" {
  domain_name              = var.domain
  certificate_arn          = var.arn
}

resource "aws_api_gateway_base_path_mapping" "mapping" {
  api_id      = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_deployment.deployment.stage_name
  domain_name = aws_api_gateway_domain_name.domain.domain_name
}

resource "aws_api_gateway_resource" "api_resource" {
  for_each = locals.services_flat

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = each.value.path_part
}

locals {
  methods_flat = tomap(flatten([
    for svc_key, svc in locals.services_flat : [
      for method in svc.methods : {
        key     = "${svc_key}-${method}"
        path    = svc.path_part
        method  = method
        uri     = svc.uri
      }
    ]
  ]))
}

resource "aws_api_gateway_method" "api_method" {
  for_each = locals.methods_flat

  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.api_resource[each.value.path].id
  http_method   = each.value.method
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "api_integration" {
  for_each = locals.methods_flat

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_method.api_method[each.key].resource_id
  http_method = aws_api_gateway_method.api_method[each.key].http_method

  type                    = "HTTP_PROXY"
  uri                     = each.value.uri
  integration_http_method = each.value.method
}
