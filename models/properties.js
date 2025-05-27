const db = require("../db/connection");

exports.selectProperties = async (queries) => {

    const maxPrice = queries.maxprice;
    const minPrice = queries.minprice;
    const sort = queries.sort;
    const order = queries.order;
    const host = queries.host;

    let standardQuery = `SELECT 
        property_id, name AS property_name, location, price_per_night, CONCAT(users.first_name, ' ', users.surname) AS host 
        FROM 
        properties 
        JOIN 
        users 
        ON 
        properties.host_id = users.user_id `;

    const params = [];
 
    if (queries.maxprice){
        standardQuery += `WHERE price_per_night <= ${queries.maxprice} `
    };
    if (queries.minprice){
        standardQuery += `WHERE price_per_night >= ${queries.minprice} `
    };
    if (queries.host){
        standardQuery += `WHERE host_id = ${queries.host} `
    };

    const {rows} = await db.query(standardQuery, params);
    return rows;

};