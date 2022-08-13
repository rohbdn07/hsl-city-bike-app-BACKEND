**Helsinki City Bike application (Backend with node Js and typescript)**

Project is about to create a UI and a backend service for displaying travel data made with helsinki city bikes in the Uusimaa region. \
This is a backend repository. Frontend repository can be found here: \
Link: https://github.com/rohbdn07/hsl_citybike_FRONTEND.git \
Please follow following steps to run this repository.

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

-   MVC Project Structure.
-   Backend built in Node.js with typescript.
-   Database: PostgreSQL.
-   Run script to parse CSV files and store it into database tables.

## Prerequisites

To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [Docker](https://www.docker.com/get-started/)
-   Install [VS Code](https://code.visualstudio.com/)

### Download Requirements to populate PostgreSQL database

For this exercise, download four datasets of journey data list and station list. The data is owned by City Bike Finland. To populate database, you mush download these CSV datas and keep it into your local machine OR inside this project folder. For example:

```bash
# keep all CSV data into seperate folder called: data
cd src/database/<create a new folder>
# By doing so, all CSV datas are ignored from git. Check out at .gitignore file
```

Datasets are:

1. https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
2. https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
3. https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations. 4) https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

## Getting Started

To get started you must follow following steps one after another:

1. Clone this repository
2. Create `.env` file into the root of the porject.
3. Put all the required env variables into .env file, Check `.env-example` file for required variables.
4. Run docker compose command. First, simply run this command in the terminal:  
   `make up` \
   this command run docker-compose up and build services. It also create a database for you automatically. Follow Docker section for more details.

5) Create a new folder (named it as `data`) under `src` folder. Download all above given four datasets into it.
6) Populate database with some data in it locally. \
   Run a script file with some required aggruments. Check out for more information: [Populate database table with data](#populate-database-table-with-data).

### 1) Git Clone

```bash
# Get the latest snapshot
git clone https://github.com/rohbdn07/hsl-city-bike-app-BACKEND.git

# Change into root directory
cd <root folder>
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

#### Docker-compose up

After all above steps, simply run in the terminal: `make up` \
 Make sure you're at root folder at the terminal.

```bash
# build and run the docker containers
make up
```

it then runs docker build command up and install all the dependencies required. \
It also create database on postgresSQL automatically.
Next, this backend will serve at: `https://localhost:5050` \
For Pg-Admin (GUI) will serve at: `https://localhost:5000`

#### Docker-compose down

docker-compose down, it then stop and removes all services containers.

```bash
# stops and remove the docker containers
make down
```

## 5) Populate database table with data

At the root of this project, there is a script file called: `runcsv.ts`. This script is use for inserting data into database. Use following table name and pass it one after another as described below. \
Tables name are:

-   table2021_05
-   table2021_06
-   table2021_07
-   hsl_bike_station

```bash
## run this command. See at package.json
npm run csv --file=<filename.csv> --table=<tableName> --counts=<totalNumberOfRowsYouWantToDisplay>

## for example:
npm run csv --file=2021-05.csv --table=table2021_05 --counts=5000
```

Note:

-   Run this script command for each tables. First, let finish first action then repeat for another action.
-   table names MUST be same one that is mentioned above.
-   --file=<filename.csv> denotes that datasets that you had already downloaded.
-   --counts= total number of rows that you want to display. You can increase this counts value. Keep it in mind that larger counts values take little more time to inserted rows into respective tables.
