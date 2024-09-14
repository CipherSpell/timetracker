variable docker_img {
  description = "Docker image to pull from docker registry"
}

variable container_name {
  type = string
  description = "Name of the postgres container"
}

variable external_port {
  type = number
  description = "External port to expose Postgres"
}

variable postgres_user {
  type = string
  default = ""
  description = "Postgres user"
}

variable postgres_password {
  type = string
  default = ""
  description = "Postgres password"
}

variable postgres_db {
  type = string
  default = ""
  description = "Database name"
}

variable volume_name {
  type = string
  default = ""
  description = "Name of the docker volume which should be mounted"
}
