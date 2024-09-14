output container_id {
  value = docker_container.postgres[*].id 
}

output container_name {
  value = docker_container.postgres[*].name 
}

output container_network {
  value = docker_container.postgres[*].network_data
}

# Outputs needed for ansible
output db_name {
  value = var.postgres_db 
}

output db_login_user {
  value = var.postgres_user 
}

output db_login_password {
  value = var.postgres_password
}

output db_port {
  value = var.external_port
}
