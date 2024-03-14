# Devops API Node

This is the API for the Devops project. It is built with TypeScript and uses Fastify for routing.

## API Routes

### Health Check

- **Endpoint:** `/health-check`
- **Method:** GET
- **Description:** This endpoint is used to check the health of the API. If the API is up and running, it will return a 200 status code.

### Pokemon

- **Endpoint:** `/pokemon`
- **Method:** GET
- **Description:** This endpoint returns a list of all Pokemon in the database.
---
- **Endpoint:** `/pokemon/:id`
- **Method:** GET
- **Description:** This endpoint returns a specific Pokemon by its ID. If the Pokemon with the given ID does not exist, it will return a 404 status code.

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Specifies the environment in which the application is running. This can be `development`, `testing`, or `production`.
- `API_PORT`: Specifies the port on which the API will run.
- `DATABASE_URL`: Specifies the connection string for the database.

These variables are loaded from a `.env` file at the root of the project. You can create this file based on the `.env.example` file. Remember not to commit the `.env` file to the version control system.

## Running the Project

To run this project, you need to have Node.js and Yarn installed. Then, you can run the following commands:

```sh
# Install dependencies
yarn

# Optional: if the database has not been set up yet, you can run the following command to set it up
yarn init-db

# Run the project in development mode
yarn dev
```

## Building the Project

To build this project, you can run the following command:

```sh
yarn build
```