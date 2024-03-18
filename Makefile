export DOCKER_COMPOSE=docker-compose
install: ## Install all dependencies
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) run --rm backend_node yarn install
run: ## Run the docker stack
	$(DOCKER_COMPOSE) up -d
stop: ## stop the docker stack
	$(DOCKER_COMPOSE) stop
logs: ## logs
	$(DOCKER_COMPOSE) logs --tail=10 -f
prettier: ## Install all dependencies
	$(DOCKER_COMPOSE) exec backend_node npm run lint:fix
down: ## Delete the Docker containers and volumes
	$(DOCKER_COMPOSE) down -v
cli:
	$(DOCKER_COMPOSE) exec backend_node sh
