Last Update: 26 May 2025


# AirBNC


AirBNC is a ...


## SETUP


1. Install NPM dependencies 

        npm i

    Dependencies used:

    - **dotenv** - 
    - **express** - 
    - **pg** - 
    - **pg-format** - 

    Dev Dependencies used:

    - **jest** - 
    - **nodemon** - 
    - **supertest** - 

2. Setup Database

    **!!WARNING!!** This next script includes a command to drop any existing database called "airbnc_test"

        npm run setup-db


3. Create `.env`  file at the root level with the following content:

        PGDATABASE=airbnc_test


4. Run Seed script

        npm run seed

    Tables seeded:
    - Property Type
    - Users
    - Properties
    - Reviews
    - Favourites


## USAGE