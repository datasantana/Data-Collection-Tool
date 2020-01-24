<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>
<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

- [Installation](#installation)
  - [Database configuration](#database-configuration)
  - [Connection database](#connection-database)
  - [Running app](#running-app)
  - [Test](#test)
  - [Deploy](#deploy)
  - [Support](#suport)
  - [Licence](#licence)

## Installation

To open project in text editor

```bash
$ npm install
```

## Database configuration

1. Install Postgres.

  You can to install postgres version 11.2 or superior

2. Access to Shell psql.

  Insert parameters connection 

```bash
$ Server [localhost]:
$ Database [postgres]:
$ Port [5432]:
$ Username [postgres]: 
$ Password user postgres:
```
3. Create Database

```bash
$ CREATE DATABASE nom_database
$ \c nom_database
$ \i PAHT/omi/backend/resources/scriptdb
$ \l
$ \q
```
#### Resume

* CREATE DATABASE: Name the new database
* \c: Access database
* \i: Run script to create database configuration
* \l: Verify database creation
* \q: Exit shell

### Connection database

* Create new file ormconfig.json at the root of the project with parameters from ormconfigtemplate.json

## Running app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Deploy

```bash
# optimized
$ npm run build

# deploy
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

  Nest is [MIT licensed](LICENSE).
