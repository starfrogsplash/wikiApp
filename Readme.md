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
DB_HOST=localhost
DB_USER=dbUser
DB_PASS=dbPass
TEST_USER=dbTestUser
TEST_PASS=dbTestPass
NODE_ENV=development
DEV=docker-db
```

2. To spin up docker databases
```
docker-compose up
```



3. Install dependencies for the app
```
npm install
```


4. initialize the schema
```
npm migrateUp
```

###
5. to start the app
###
```
npm start
```

###
to see Swagger docs go to this endpoint
###
```
http://localhost:3000/api-docs
```
