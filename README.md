Last Update: 10 May 2025

# AirBNC

AirBNC is a ...

## SETUP

Initialise NPM
    npm init -y

Install NPM dependencies (Jest, node-postgres)
    npm i

!!WARNING!! The next script includes a command to drop any existing database called "airbnc_test"

Create Database
    psql -f ./db/setup-db.sql

