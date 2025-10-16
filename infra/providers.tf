terraform {
  required_providers {
    koyeb = {
      source  = "koyeb/koyeb"
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
