const db = require("./connection");
const format = require("pg-format");


exports.insertPropertyTypes = (propertyTypes) => {
    return db.query(format(`INSERT INTO property_type(property_type, description) VALUES %L`, propertyTypes));
};

exports.insertUsers = (users) => {
    return db.query(format(`INSERT INTO users(first_name, surname, email, phone_number, is_host, avatar) VALUES %L RETURNING *`, users));
};

exports.insertProperties = (properties) => {
    return db.query(format(`INSERT INTO properties(host_id, name, location, property_type, price_per_night, description) VALUES %L RETURNING *`, properties));
};

exports.insertReviews = (reviews) => {
    return db.query(format(`INSERT INTO reviews(property_id, guest_id, rating, comment) VALUES %L`, reviews));
};