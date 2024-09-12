# This is the default behavior, but I'm explicitly declaring it here for clarity

terraform {
  backend "local" {
    path = "./terraform.tfstate"
  }
}
