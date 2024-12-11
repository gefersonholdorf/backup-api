## API - Backup Status

## Description

A project built using NodeJS | NESTJS | TypeORM | Typescript, the functionality of this API is to fetch JSON files from a specific storage, and based on these JSON files, create records in the database. The API's response is a GET /status, which returns the backups and their respective statuses. 0 if the backup failed, and 1 if the backup succeeded.

## Project setup

```bash
$ git clone https://github.com/gefersonholdorf/backup-api.git
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start:hom

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Prerequisite

To run the project, a .env.production file is required with the following configurations:

```bash

$ PORT=
$ HOST=
$ NODE_ENV=production
$ BD_HOST=
$ BD_PORT=
$ BD_USER=
$ BD_PASSWORD=
$ BD_DATABASE=
$ URL_STORAGE=
```

## Stay in touch

- Author - [Geferson Holdorf](https://www.linkedin.com/in/geferson-holdorf-601819202/)
- Website - [Em desenvolvimento](www.emdesenvolvimento.com.br)
- LinkedIn - [@gefersonholdorf](https://www.linkedin.com/in/geferson-holdorf-601819202/)


