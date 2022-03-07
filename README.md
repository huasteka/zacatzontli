# Zacatzontli

[![Travis](https://img.shields.io/travis/huasteka/zacatzontli.svg?style=flat-square)](https://travis-ci.org/huasteka/zacatzontli)
[![GitHub issues](https://img.shields.io/github/issues/huasteka/zacatzontli.svg?style=flat-square)](https://github.com/huasteka/zacatzontli/issues)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/04f5303d431d4b5d946413be4c19bafe)](https://www.codacy.com/app/huasteka/zacatzontli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=huasteka/zacatzontli&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/04f5303d431d4b5d946413be4c19bafe)](https://www.codacy.com/app/huasteka/zacatzontli?utm_source=github.com&utm_medium=referral&utm_content=huasteka/zacatzontli&utm_campaign=Badge_Coverage)

Zacatzontli is an open source lightweight authentication manager API developed with [Node JS](https://nodejs.org).

## Setup

The minimum requirements are:

- [PostgreSQL](http://www.postgresql.org) (>= 9.3)
- [Node JS](https://nodejs.org) (~ 6.10.3)
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

## License

Zacatzontli is Copyright © 2017 Huasteka.

It is free software, and may be redistributed under the terms specified in the [LICENSE.md](LICENSE.md)
