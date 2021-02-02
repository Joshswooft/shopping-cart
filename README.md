<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

## Description

Shopping cart microservice built using [Nest](https://github.com/nestjs/nest).

## Architecture Overview

The REST API acts as a API-Gateway/proxy for the shopping-cart microservice to be reached from public traffic.
The controller of the gateway emits events using nests CQRS module. Each event is consumed by a handler where the information is then
used by it's respective service which has injected the repository and commits the command. Once the command has been commited we link the event dispatcher to the messaging system to dispatch our event to the event store. When this change in state is gradually applied this is propagated to all
subscribers in the read model. One of the problems with the database per service architecture is how do you combine multiple transactions into a single larger transaction?

For instance when a user buys something from a store that event may have to do multiple steps:

- clear the shopping basket
- process payment
- process order

If any of these stages fail then our system is left out of sync. This is where the SAGA pattern shines as it attempts to provide ACD transactions. Upon failure we can either rollback or publish a compensating action.

## Design Patterns

1. Microservice Architecture
2. API Gateway
3. Database per service
4. Externalised Configuration
5. Event Soucing + CQRS + SAGA

# Project Structure

1. `api-gateway` Contains the REST HTTP server which proxies the outside requests to internal micro-services
2. `data-models` Contains the DTO (Data transfer Objects)
3. `entities` Contains the Entities for the service
4. `events`
5. `inputs` The inputs to requests for the commands
6. `model-interfaces` Interfaces for entities and others
7. `commands` Directory containing `handler` and `command`

## API Documentation

TODO: Use Swagger

## Installation

```bash
$ yarn
$ cp .env.example .env
```

## Starting with docker

This repository uses a Postgres database [image](https://hub.docker.com/_/postgres/).
To start make sure you have docker installed and use `$ docker-compose up -d` to start the required containers.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
