const db = require("../db/connection");

exports.selectUser = async (userID) => {

    if(isNaN(userID)){
        return Promise.reject();
    };

    const standardQuery = `SELECT
    user_id, first_name, surname, email, phone_number, avatar, created_at
    FROM
    users
    WHERE
    user_id = ${userID} `;


    const {rows} = await db.query(standardQuery);
    return rows;

};

exports.updateUser = async (userID, updates) => {
    
    let standardQuery = `UPDATE 
    users 
    SET 
    `;

    standardQuery += Object.keys(updates).map((property) => {
       return `${property} = '${updates[property]}' `
    }).join(", ");

    standardQuery += `WHERE 
    user_id = ${userID}
    RETURNING *;`;

    const {rows} = await db.query(standardQuery);
    return rows;
};