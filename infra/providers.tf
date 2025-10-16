terraform {
  required_providers {
    koyeb = {
      source  = "koyeb/koyeb"
      version = ">= 0.1.0"
    }
    random = {
      source = "hashicorp/random"
      version = ">= 3.0.0"
    }
  }
  required_version = ">= 1.0.0"
}

provider "koyeb" {
  
}
