# Pull postgres docker image
resource docker_image postgres_img {
  name = var.postgres_image 
}

# Run the postgres container
resource docker_container postgres {
  image = docker_image.postgres_img.name
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
