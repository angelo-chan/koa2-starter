# KOA2-Starter

## Features

- integrate **mongoose** for mongo operation
- integrate **ioredis** for cache 
- integrate **gulp** for build
- integrate **pm2** for deploy
- integrate **git-rev** for server version
- integrate **eslint** for lint by **airbnb** rule
- integrate **jwt** for token generate and validation
- integrate **apidoc** for doc generate
- integrate **graphql** and **graphiql** for graphql support 
- integrate **morgan** for logging
- integrate **passport** for authentication
- support ES7 **async** **await** 
- suport database migration
- support multiple env
- support health check
- support routing

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/en/) Node ^6.2.0, npm ^3.8.9
- [gulp](http://gulpjs.com/) (`npm install -g gulp-cli`)
- [MongoDB](https://www.mongodb.org/)  Mongo ^3.2.x  - Keep a running daemon with `mongod`
- [Redis-Server](http://redis.io/) - Keep a running daemon with `redis-server`

### Setup

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `redis-server` in a seperate shell to keep an instance of the Redis Server running

### Develop

1. Run `gulp` or `make run` to start a node server and watch the source code

### Debug

1. Select **babel-node** as node interceptor
2. Start debug **server/index.js** in ide

### Build

- Run `gulp build` to build ci package
- Run `gulp prod` to build prod package

## Style

1. import **airbnb.xml** to **Editor => Code Style => JavaScript**
2. use `ALT + CMD + L` to format the code

## Dependency

- watch and hot-reload: [nodemon](http://nodemon.io/)
- build: [babel](http://babeljs.io/)
- lint: [eslint](http://eslint.org/)
