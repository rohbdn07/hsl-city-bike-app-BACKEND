## Helsinki City Bike application (Backend with node Js and typescript)

This a backend part of a full-stack Project which is to create a UI and a backend service for displaying journey lists of data made with Helsinki city bikes in the Uusimaa region. \
This is a backend repository. Frontend repository can be found here: \
Link: https://github.com/rohbdn07/hsl_citybike_FRONTEND.git \
Please follow following steps to run this backend repository.

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Populate database table with data](#populate-database-table-with-data)
-   [Docker](#docker)
-   [Project Structure](#project-structure)
-   [PG-ADMIN](#pg-admin)
-   [Test](#test)
-   [APIs](#apis)
-   [Migrations](#migrations)
-   [Useful Tools and Resources](#useful-tools-and-resources)

## Features

-   MVC Project Structure.
-   Backend built in Node.js with typescript.
-   Database: PostgreSQL.
-   ORM: typeORM.
-   PG-Admin: GUI interface.
-   Run script to parse CSV files and store it into database tables.

## Prerequisites

To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [Docker](https://www.docker.com/get-started/)
-   Install [VS Code](https://code.visualstudio.com/)

### Download CSV files in order to populate PostgreSQL database

For this exercise, download four datasets of journey data list and station list. The data is owned by Helsinki City Bike Finland. To populate database, you MUST download these CSV datas and keep it inside this project folder under `src/database/data`. For example:

```bash
# keep all CSV data(s) into seperate folder called: data
cd src/database/<create a new folder>
# Like this:
cd src/database/data
# By doing so, all CSV datas are ignored from git. And script file get right path to get CSV files. Check out at 'runcsv.ts' file
```

Datasets are:

1. https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
2. https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
3. https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations. \
4) https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

License and information: \
 https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

## Getting Started

To get started you must follow following steps one after another:

1. Clone this repository
2. Create `.env` file into the root of the project.
3. Put all the required env variables into .env file, Check `.env-example` file for required variables.
4. Run docker compose command. First, simply run this command in the terminal:  
   `make up` \
   this command run docker-compose up and build services. It also create a database for you automatically. Follow Docker section for more details.

5) Create a new folder (named it as `data`) under `src/database/` folder. Download all above given four datasets into it. You may required to rename dataset number 4 in correct format with .CSV file extension. \
   Like this: `hsl_citybike_stations.csv`
6) Populate database with some data in it locally. \
   Run a script file with some required aggruments. Check out for more information: [Populate database table with data](#populate-database-table-with-data).

### 1) Git Clone

```bash
# Get the latest snapshot
git clone https://github.com/rohbdn07/hsl-city-bike-app-BACKEND.git

# Change into root directory
cd hsl-city-nike-app-backend
```

### 2 & 3) Put environment variables:

Create `.env` file at the root of the project. Put below env variables.

```bash
# required env variables
MODE=DEV
PORT =5050
POSTGRES_PASSWORD = password
POSTGRES_USER =root
POSTGRESQL_HOST =postgres
POSTGRESQL_PORT= 5432

PGADMIN_DEFAULT_EMAIL =root@root.com
PGADMIN_DEFAULT_PASSWORD =root

# give user a name, password, and database name
# Important (must required)
APP_DB_USER=
APP_DB_PASS=
APP_DB_NAME=
```

### 4) Docker

#### make up

After finishing above steps, simply run this command in your terminal: \
 `make up` \
 Make sure you're at the root folder of the project in the terminal.

```bash
# build and run the docker containers
make up
```

it then runs docker build command up and install all the dependencies required. \
It also create database on postgresSQL automatically.
Next, this backend will serve at: `https://localhost:5050` \
For Pg-Admin (GUI) will serve at: `https://localhost:5000`

#### make down

Docker-compose down, it then stop and removes all services containers.

```bash
# stops and remove the docker containers
make down
```

## 5) Populate database table with data

Make sure that you MUST have already downloaded all datasets and stored(moved) it into a newly created folder (data) under src/database/< new folder> before starting below commands. \
Like this: `src/database/data `

After above instruction, at the root of this project, there is a script file called: `runcsv.ts`. This script is use for inserting data into database. Use following table name and pass it one after another as described below. \
Tables name are:

-   table2021_05
-   table2021_06
-   table2021_07
-   hsl_bike_station

```bash
## run this command. See at package.json for details
npm run csv --file=<filename.csv> --table=<tableName> --counts=<totalNumberOfRowsYouWantToDisplay>

## for example:
npm run csv --file=2021-05.csv --table=table2021_05 --counts=5000
```

Note:

-   Run this script command for each tables. First, let finish first action then repeat for another action.
-   table names MUST be same one that is mentioned above.
-   --file=<filename.csv> denotes that datasets that you had already downloaded.
-   --counts= total number of rows that you want to display. You can increase this counts value. Keep it in mind that larger counts values take little more time to inserted rows into respective tables.

### **Congratulations..after doing all this. now you can see project is running...**

You can test api(s) through Postman.

---

## PG-ADMIN

You can see database tables and schema through GUI interface: PG-Admin. \
After successfully following above steps, now you can vist: `https://localhost:5000` \
First, you need to sign in into PG-Admin:\
username: root \
password(email): root@root.com

then after, there will be a option form for: create a new server. \
 Create server with any name and then, form requires input values as your database's name, database's username, database's password. Check at your .env \
 Important note: host address MUST be `postgres` . It is because same name is given in docker-compose service for postgresSQL.

![Pg_admin_screenshoot01](https://user-images.githubusercontent.com/57314666/184510983-815b6c80-39b4-482b-8e04-e93c9d74f224.png)

Then, click 'Save button'. After that you'll see database name and under it database schema and tables on the left side of this page. \
Check if you already have all tables (empty at inital) under public schema.

## Test

You can run test locally with this command: `npm run test`

## APIs

The followings are api(s): \
Station list

-   GET Request
    -   http://localhost:5050/api/hslcitybike/stationslists \
        Get all data of stations list.
    -   http://localhost:5050/api/hslcitybike/stationslists?page=1&count=40&name=pasila \
        Get station list data according to queries.

Station information By ID

-   GET Request
    -   http://localhost:5050/api/hslcitybike/stationsinfo/501/may \
        Get station infromation and its total travel info by its station id and month.

Journey list infrormation

-   GET Request
    -   http://localhost:5050/api/hslcitybike/journeylist/month/july \
        Get all journey lists of particular month
    -   http://localhost:5050/api/hslcitybike/journeylist/month/july?page=1&count=20&search=Mäntyviita \
        Get journey list according to queries.

### Migrations

Once you get into production you'll need to synchronize model changes into the database. Typically, it is unsafe to use `synchronize: true` for schema synchronization on production once you get data in your database. Here is where migrations come to help.

A migration is just a single file with sql queries to update a database schema and apply new changes to an existing database. \
In this project, ORM: `typeORM` is in use. Follow this link for more details: \
https://typeorm.io/migrations

Run migration with following command(s): \
`npm run migration:generate` \
it generate migration file(s) automatically.

On every changes in entity (data table column), run migration with this command: \
`npm run migration:up` \
it run migration so that you will get updated tables into a database.

### Useful Tools and Resources

TypeScript

-   https://www.typescriptlang.org/

Node Js

-   https://nodejs.org/en/docs/

NPM

-   https://www.npmjs.com/

Express Js

-   http://expressjs.com/

TypeORM

-   https://typeorm.io/

PostgreSQL

-   https://www.postgresqltutorial.com/

Docker

-   https://www.docker.com/get-started/

Jest (testing)

-   https://jestjs.io/
