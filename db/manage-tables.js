const db = require("./connection.js");

const {dropTables,
    createPropertyType,
    createUsers,
    createProperties,
    createReviews,
    createFavourites} = require("./queries.js");

exports.manageTables = async () => {

    await db.query(dropTables);

    await db.query(createPropertyType);

    await db.query(createUsers);

    await db.query(createProperties);

    await db.query(createReviews);

    await db.query(createFavourites);

};