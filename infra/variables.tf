variable "KOYEB_TOKEN" {
  description = "Koyeb API token (set via env KOYEB_TOKEN)"
  type        = string
  sensitive   = true
}

variable "docker_image_name" {
  description = "Docker image name (e.g. nilsonmazurchi/gerenciador-tarefas)"
  type = string
}

variable "docker_image_tag" {
  description = "Docker image tag to deploy"
  type = string
}
