const db = require("../db/connection");

exports.selectProperties = async ({maxprice: maxPrice, minprice: minPrice, sort = "favourites", order, host}) => {

    const validSorts = ["favourites", "cost_per_night"];

    if(!validSorts.includes(sort)){
        return Promise.reject();
    } else {
        switch(sort){
            case "favourites":
                sort = "(SELECT COUNT(property_id) FROM favourites WHERE favourites.property_id = properties.property_id)";
                break;
            case "cost_per_night":
                sort = "price_per_night";
                break;
        };
    };

    // Instead of throwing an error, order will default to descending if input is invalid
    if(order === "ascending"){
        order = "ASC";
    } else {
        order = "DESC";
    };

    let standardQuery = `SELECT 
        properties.property_id, name AS property_name, location, price_per_night, CONCAT(users.first_name, ' ', users.surname) AS host 
        FROM 
        properties 
        JOIN 
        users 
        ON 
        properties.host_id = users.user_id
        JOIN
        favourites
        ON
        properties.property_id = favourites.property_id `;

    const params = [];

    if(maxPrice || minPrice || host){
        standardQuery += "WHERE ";
        if (maxPrice){
        standardQuery += `price_per_night <= ${maxPrice} `
        };
        if (minPrice){
            standardQuery += `price_per_night >= ${minPrice} `
        };
        if (host){
            standardQuery += `host_id = ${host} `
        };
    };

    standardQuery +=`GROUP BY
    properties.property_id, property_name, location, price_per_night, host `;

    standardQuery += `ORDER BY ${sort} ${order}`;
    
    const {rows} = await db.query(standardQuery, params);
    return rows;

};

exports.selectProperty = async (propertyID, userID) => {

    const standardQuery = `SELECT 
        properties.property_id, name AS property_name, location, price_per_night, description, CONCAT(users.first_name, ' ', users.surname) AS host, users.avatar AS host_avatar, COUNT(favourites.property_id) AS favourite_count 
        FROM 
        properties 
        JOIN 
        users 
        ON 
        properties.host_id = users.user_id
        JOIN
        favourites
        ON
        properties.property_id = favourites.property_id
        WHERE
        properties.property_id = ${propertyID}
        GROUP BY
        properties.property_id, property_name, location, price_per_night, description, host, host_avatar `;

    const {rows} = await db.query(standardQuery);

    if (rows.length === 0){
        return Promise.reject({status: 404, msg: "Property Not Found."});
    }

    return rows;
};

exports.selectReviews = async (propertyID) => {

    const standardQuery = `SELECT
    property_id, comment, rating, reviews.created_at, CONCAT(users.first_name, ' ', users.surname) AS guest, users.avatar AS guest_avatar
    FROM
    reviews
    JOIN
    users
    ON
    reviews.guest_id = users.user_id
    WHERE
    property_id = ${propertyID} `;

    const {rows} = await db.query(standardQuery);
    return rows;

};

exports.insertReview = async (propertyID, review) => {

    const newReview = [propertyID, review.guest_id, review.rating, review.comment];
    const standardQuery = `INSERT INTO
    reviews (property_id, guest_id, rating, comment)
    VALUES
    ($1, $2, $3, $4)
    RETURNING
    review_id, property_id, guest_id, rating, comment, created_at`;

    const {rows} = await db.query(standardQuery, newReview);
    return rows;
};