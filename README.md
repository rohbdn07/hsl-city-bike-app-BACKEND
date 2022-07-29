**Helsinki City Bike application (Backend with node and typescript)**

-   At the moment, this project is in under construction. \
    This project is about to create a UI and a backend service for displaying data from journeys made with city bikes in the Helsinki Capital area.

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Populate database table with data](#populate-database-table-with-data)
-   [Project Structure](#project-structure)
-   [Useful Tools and Resources](#useful-tools-and-resources)
-   [Pro Tips](#pro-tips)
-   [FAQ](#faq)
-   [How It Works](#how-it-works-mini-guides)
-   [Deployment](#deployment)
-   [Docker](#docker)
-   [Production](#production)

## Features

-   MVC Project Structure
-   Backend built in Node.js with typescript
-   Database: PostgreSQL
-   Script to run parse CSV files into database tables

## Prerequisites

To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [Docker](https://www.docker.com/get-started/)
-   Install [VS Code](https://code.visualstudio.com/)

### Download Requirements to populate PostgreSQL database

For the exercise download three datasets of journey data. The data is owned by City Bike Finland. To populate database, you mush download these CSV datas and keep it into your local machine OR inside this project folder.

```bash
# keep all CSV data into seperate folder called: data
cd src/database/<create a new folder>
# By doing go, all CSV datas are ignored from git.Check at .gitignore file
```

https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

Dataset: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

## Getting Started

The easiest way to get started is to clone the repository and run docker-compose up command:

```bash
# Get the latest snapshot
git clone <this project>

# Change directory
cd <root folder>

# docker-compose up
# it then runs docker build command up and install all the dependencies required
make up

# docker-compose down
# it then stop and removes containers
make down
```

Next, project will serve at: `https://localhost:5050`

### Put environment variables:

```bash
# required env variables
MODE=
PORT =
POSTGRES_PASSWORD =
POSTGRES_USER =
PGADMIN_DEFAULT_EMAIL =
PGADMIN_DEFAULT_PASSWORD =
POSTGRES_DB=
POSTGRESQL_HOST =
POSTGRESQL_PORT=
TYPEORM_RUN_MIGRATIONS=
TYPEORM_SYNC_DEV=
```

## Populate database table with data

At root of this project there is a file called: `runcsv.ts`. Inside it, there is a file path to get CSV file and parse it and Insert data into database table. Replace table name with this one individually and run script.
Tables are:

-   table2021_05
-   table2021_06
-   table2021_07
-   hsl_bike_station

```bash
## run this command. Checkout package.json
npm run csv
```
