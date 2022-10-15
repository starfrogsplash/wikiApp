# WIKI App API

A wiki app api which has one to many relationship model (documents and its revisions) built using:
TypeScript, jest, knex, postgres, Docker-compose


## Installation

You will need

- [docker](https://docs.docker.com/get-docker)
- [Node](https://nodejs.org/en/download)
- [TypeScript](https://www.typescriptlang.org/download)

### Instructions

1. you will need to create an .env file at the root of the this project, with these environment variables

```
DB_HOST=db
DB_USER=dbUser
DB_PASS=dbPass
DB_TEST_HOST=localhost
TEST_USER=dbTestUser
TEST_PASS=dbTestPass
NODE_ENV=development
DEV=docker-db
```

2. To spin up databases and the app

```
docker-compose up
```

###
3. To run tests locally
###
```
npm run test
```

###
To see Swagger docs go to this endpoint
###
```
http://localhost:3000/api-docs
```
