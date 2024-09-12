module postgres_dev {
  source = "../../modules/postgres_db/"
  container_name = "postgres_dev"
  external_port = 5432
  postgres_user = "dev_user"
  postgres_password = "test"
  postgres_db = "dev_db"
}
