const db = require("../db/connection");

exports.selectProperties = async ({queries}) => {

    console.log(queries);

    const {rows} = await db.query(`SELECT 
        property_id, name AS property_name, location, price_per_night, CONCAT(users.first_name, ' ', users.surname) AS host 
        FROM 
        properties 
        JOIN 
        users 
        ON 
        properties.host_id = users.user_id`);
    return rows;

};