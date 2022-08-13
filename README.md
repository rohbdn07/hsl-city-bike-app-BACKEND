**Helsinki City Bike application (Backend with node and typescript)**

-   At the moment, this project is in under construction. \
    This project is about to create a UI and a backend service for displaying data from journeys made with city bikes in the Helsinki Capital area.

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Populate database table with data](#populate-database-table-with-data)
-   [Docker](#docker)
-   [Project Structure](#project-structure)
-   [Useful Tools and Resources](#useful-tools-and-resources)
-   [Pro Tips](#pro-tips)
-   [How It Works](#how-it-works-mini-guides)

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
# By doing go, all CSV datas are ignored from git. Look at .gitignore file
```

https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv \
https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv \
https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
\
Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

Dataset: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv \
License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

## Getting Started

To get started you should follow following steps one after another: \

1. Clone the repository
2. Create .env file into the root of the porject.
3. Put all the required env variables into .env file, Check `.env-example` file.
4. Run docker compose command. Simply run this command in the terminal:  
   `make up` \
   this command run docker-compose up and build services.

5) Create a new folder (named it as `data`) under `src` folder. Download all above given datasets into it.
6) Populate database with some data in it. \
   Run a script file with some required aggruments. Check out below for more information.

```bash
# Get the latest snapshot
git clone <this project>

# Change directory
cd <root folder>
```

Next, project will serve at: `https://localhost:5050`

### Put environment variables:

Create `.env` file at the root of the project. Put below env variables.

```bash
# required env variables
MODE=DEV
PORT =5050
POSTGRES_PASSWORD =
POSTGRES_USER =root
POSTGRESQL_HOST =postgres
POSTGRESQL_PORT= 5432

PGADMIN_DEFAULT_EMAIL =root@root.com
PGADMIN_DEFAULT_PASSWORD =root
# give user a name, password, and database name
APP_DB_USER=
APP_DB_PASS=
APP_DB_NAME=
```

### Docker

```bash
# build and run the docker containers
make up
```

it then runs docker build command up and install all the dependencies required.

```bash
# stops and remove the docker containers
make down
```

docker-compose down,
it then stop and removes containers.

## Populate database table with data

At the root of this project, there is a script file called: `runcsv.ts`. This script is use for populating data into database. Use following table name and pass it one after another as described as below. \
Tables name are:

-   table2021_05
-   table2021_06
-   table2021_07
-   hsl_bike_station

```bash
## run this command. See at package.json
npm run csv --file=<filename.csv> --table=<tableName> --counts=<totalNumberOfRows>

## for example:
npm run csv --file=2021-05.csv --table=table2021_05 --counts=5000
```

Run script for each tables. First, let finish first action then repeat for another action.
