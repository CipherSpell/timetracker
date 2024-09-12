output container_id {
  value = module.postgres_dev.container_id
}

output container_name {
  value = module.postgres_dev.container_name 
}

output container_network {
  value = module.postgres_dev.container_network
}

# Outputs needed for ansible
output db_name {
  value = module.postgres_dev.db_name 
}

output db_login_user {
  value = module.postgres_dev.db_login_user 
}

output db_login_password {
  value = module.postgres_dev.db_login_password
}

output db_port {
  value = module.postgres_dev.db_port
}
