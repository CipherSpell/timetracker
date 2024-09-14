module postgres_dev {
  source = "../../modules/docker/"
  docker_img = "postgres:latest"
  container_name = "postgres_dev"
  external_port = 5432
  postgres_user = "dev_user"
  postgres_password = "test"
  postgres_db = "dev_db"
}

module redis_dev {
  source = "../../modules/docker/"
  docker_img = "redis:7.4-alpine"
  container_name = "redis_dev"
  external_port = 6379
}
