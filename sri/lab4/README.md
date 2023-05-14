# Requirements

Requirements: `docker`, `docker-compose`

# How to run full dockerized app

```
docker-compose up
```

# How to only create dockerized infrastructure

For local development purposes you can do

```
docker-compose -f docker-compose.infra.local.yml up
```

This will create AWS resources.

You can then run app in watch mode using

```
yarn
yarn start:dev
```
