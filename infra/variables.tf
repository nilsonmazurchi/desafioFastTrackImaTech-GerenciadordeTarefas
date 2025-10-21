variable "docker_image_name" {
  description = "Docker image name (e.g. nilsonmazurchi/gerenciador-tarefas)"
  type = string
  default     = "nilsonmazurchi/gerenciador-tarefas"
}

variable "docker_image_tag" {
  description = "Docker image tag to deploy"
  type = string
  default     = "latest"
}
