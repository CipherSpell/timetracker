# Pull postgres docker image
resource docker_image docker_img {
  name = var.docker_img
}

# Run the postgres container if the requested image is postgres
resource docker_container postgres {
  count = "${startswith(docker_image.docker_img.name, "postgres") ? 1 : 0}"

  image = docker_image.docker_img.name
  name = var.container_name

  ports {
    internal = 5432
    external = var.external_port
  }

  env = [
    "POSTGRES_USER=${var.postgres_user}",
    "POSTGRES_PASSWORD=${var.postgres_password}",
    "POSTGRES_DB=${var.postgres_db}"
  ]

  volumes {
    container_path = "/var/lib/postgresql/data"
    volume_name = var.volume_name 
  }

  restart = "always"
}


resource docker_container redis {
  count = "${startswith(docker_image.docker_img.name, "redis") ? 1 : 0}"

  image = docker_image.docker_img.name
  name = var.container_name

  ports {
    internal = 6379
    external = var.external_port
  }
}
