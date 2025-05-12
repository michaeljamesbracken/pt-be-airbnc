const db = require("./connection")
const format = require("pg-format")

const {propertiesData,
    propertyTypesData,
    reviewsData,
    usersData} = require("./data/test")

const {formatPropertiesData,
    formatPropertyTypesData,
    formatReviewsData,
    formatUsersData} = require("./utils")




async function seed (){

    const propertyTypesSeedData = formatPropertyTypesData(propertyTypesData);
    const usersSeedData = formatUsersData(usersData);
    const propertiesSeedData = formatPropertiesData(propertiesData, usersData);
    const reviewsSeedData = formatReviewsData(reviewsData, propertiesData, usersData);
    // DROP TABLES

    await db.query(
            `DROP TABLE IF EXISTS reviews, properties, users, property_type;`
    )

    // CREATE TABLES

    await db.query(
        `CREATE TABLE property_type(
        property_type VARCHAR NOT NULL PRIMARY KEY,
        description TEXT NOT NULL);`
    )

    await db.query(
        `CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR NOT NULL,
        surname VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone_number VARCHAR,
        is_host BOOLEAN NOT NULL,
        avatar VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    )

    await db.query(
        `CREATE TABLE properties(
        property_id SERIAL PRIMARY KEY,
        host_id INTEGER NOT NULL REFERENCES users(user_id),
        name VARCHAR NOT NULL,
        location VARCHAR NOT NULL,
        property_type VARCHAR NOT NULL REFERENCES property_type(property_type),
        price_per_night DECIMAL NOT NULL,
        description TEXT);`
    )

    await db.query(
        `CREATE TABLE reviews(
        review_id SERIAL PRIMARY KEY,
        property_id INTEGER NOT NULL REFERENCES properties(property_id),
        guest_id INTEGER NOT NULL REFERENCES users(user_id),
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    )

    // INSERT DATA

    await db.query(
        format(`INSERT INTO property_type(property_type, description) VALUES %L`, propertyTypesSeedData)
    )

    await db.query(
        format(`INSERT INTO users(first_name, surname, email, phone_number, is_host, avatar) VALUES %L`, usersSeedData)
    )

    await db.query(
        format(`INSERT INTO properties(host_id, name, location, property_type, price_per_night, description) VALUES %L`, propertiesSeedData)
    )

    await db.query(
        format(`INSERT INTO reviews(property_id, guest_id, rating, comment) VALUES %L`, reviewsSeedData)
    )

}

module.exports = seed;