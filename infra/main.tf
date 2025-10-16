resource "random_id" "suffix" {
  byte_length = 4
}

resource "koyeb_app" "app" {
  name = "gerenciador-tarefas-${random_id.suffix.hex}"
}

resource "koyeb_service" "service" {
  app_name = koyeb_app.app.name

  definition {
    name = "gerenciador-tarefas"
    instance_types {
      type = "micro"
    }
    ports {
      port     = 80
      protocol = "http"
    }
    scalings {
      min = 0
      max = 1
    }
    env {
      key   = "PORT"
      value = "80"
    }
    routes {
      path = "/"
      port = 80
    }
    regions = ["was"]
    docker {
    image = "${var.docker_image_name}:${var.docker_image_tag}"
    }
  }

    depends_on = [
    koyeb_app.app
    ]
  }
