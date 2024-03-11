# Rest Template
In this repo we investigate some different ways to write a rest server

## Requirements
All the different types of server solve these requirements
- Create an **Author**
- Get an **Author** by id
- Get all **Authors**
- Create a **Book**
- Get a **Book** by id
- Get all **Books** by author

## Project Structure
All different server use the same project structure, using typeorm repositories as the db layer,
with services to handle crud operations.

### File structure
  - **package.json**
  - **package-lock.json**
  - **tsconfig.json**
  - **nodemon.json** that - Auto reload application in development. 
  - **docker-compose** - postgres and other docker services
  - **jest.config.js** - config for jest testing
  - **/test-utils** - This directory is intended for test config, mocking and factories, and other helper function that can help us when
    writing tests.
      - **factories -** Help us construct db data for testing purposes, heavily inspired by [factory boy](https://factoryboy.readthedocs.io/en/stable/) from python
      - **jest.setup.ts -** Mocks our database to a in memory sqlite instance for running tests.
      - **jest.each.ts -** Specify hooks to run, before/after tests. Here we can do things like reset db between tests.
  - **/migrations** - Migrations generated by typeorm
  - **/errors** - Custom defined Error classes and helper function for handling of errors
  - **/modules** - Our app will separate different domains by modules. 
      This will help create clear context boundaries within the app. More on modules further down

### Modules
As an example we can take a look at `Author` module.
- entity/Author.ts - Our typeorm module defintion of the author table
- schema.ts - TypeBox to validate typing
- types.ts - Inferred types from the TypeBox validator
- service.ts - Service to handle anything `Author` related, such as crud operations
- tests/ - Testing for author module. Here would be the place to test the Author service, as well as e2e tests if needed.

## Different rest server
The point of this repo is to act as a template for setting up future rest servers.
We will discover different ways of constructing rest servers. I've divided the different setups into different
branches, this way its easy to navigate between them.

Bellow are the current implementations 
- Fastify - Check out the branch `fastify` to see example and read more.
