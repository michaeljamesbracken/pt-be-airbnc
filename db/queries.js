
exports.dropTables = `DROP TABLE IF EXISTS favourites, reviews, properties, users, property_type;`;

exports.createPropertyType = `CREATE TABLE property_type(
        property_type VARCHAR NOT NULL PRIMARY KEY,
        description TEXT NOT NULL);`;

exports.createUsers = `CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR NOT NULL,
        surname VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone_number VARCHAR,
        is_host BOOLEAN NOT NULL,
        avatar VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

exports.createProperties = `CREATE TABLE properties(
        property_id SERIAL PRIMARY KEY,
        host_id INTEGER NOT NULL REFERENCES users(user_id),
        name VARCHAR NOT NULL,
        location VARCHAR NOT NULL,
        property_type VARCHAR NOT NULL REFERENCES property_type(property_type),
        price_per_night DECIMAL NOT NULL,
        description TEXT);`;

exports.createReviews = `CREATE TABLE reviews(
        review_id SERIAL PRIMARY KEY,
        property_id INTEGER NOT NULL REFERENCES properties(property_id),
        guest_id INTEGER NOT NULL REFERENCES users(user_id),
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

exports.createFavourites = `CREATE TABLE favourites(
        favourite_id SERIAL PRIMARY KEY,
        guest_id INTEGER NOT NULL REFERENCES users(user_id),
        property_id INTEGER NOT NULL REFERENCES properties(property_id));`;

