variable postgres_image {
  default = "postgres:latest"
  description = "Postgres image to pull from docker registry"
}

variable container_name {
  default = "postgres"
  type = string
  description = "Name of the postgres container"
}

variable external_port {
  default = 5432
  type = number
  description = "External port to expose Postgres"
}

variable postgres_user {
  type = string
  description = "Postgres user"
}

variable postgres_password {
  type = string
  description = "Postgres password"
}

variable postgres_db {
  type = string
  description = "Database name"
}

variable volume_name {
  default = "postgres_mock"
  type = string
  description = "Name of the docker volume which should be mounted"
}
