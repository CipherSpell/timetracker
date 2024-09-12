output container_id {
  value = docker_container.postgres.id 
}

output container_name {
  value = docker_container.postgres.name 
}

output container_network {
  value = docker_container.postgres.network_data
}
