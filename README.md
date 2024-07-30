# Zacatzontli

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/huasteka/zacatzontli/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/huasteka/zacatzontli/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b16f41e717e501d6fbc/maintainability)](https://codeclimate.com/github/huasteka/zacatzontli/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b16f41e717e501d6fbc/test_coverage)](https://codeclimate.com/github/huasteka/zacatzontli/test_coverage)

Zacatzontli is an open source lightweight authentication manager API developed with [Node JS](https://nodejs.org).

## Setup

The minimum requirements are:

- [PostgreSQL](http://www.postgresql.org) (>= 9.3)
- [Node JS](https://nodejs.org) (~ 14.21.3)
- [Sails JS](https://sailsjs.com/) (~ 1.4.2)

## Installation

To download and build the project, open a terminal and execute:

```
git clone https://github.com/huasteka/yacatecuhtli.git
cd yacatecuhtli
npm install
```

With this, all dependencies will be installed at `node_modules` directory.

## Configuration

Change the default values at `config/datastores.js` or set the required environment variables:

```
DATABASE_URL=[postgres_db_connection_url]
JWT_SECRET_KEY=[jwt_secret_key]
BCRYPT_PASSWORD_SALT=[bcrypt_password_salt]
```

## Tests

To execute all tests, open a terminal and execute:

```
npm test
```

## Run

To run the server, open a terminal and execute:

```
node app.js
```

## License

Zacatzontli is Copyright © 2017 Huasteka.

It is free software, and may be redistributed under the terms specified in the [LICENSE.md](LICENSE.md)
