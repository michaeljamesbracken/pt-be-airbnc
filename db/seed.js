const db = require("./connection");
const format = require("pg-format");

const {manageTables} = require("./manage-tables");

const {createRef,
    createUsersRef,
    formatDataWithRef,
    formatPropertyTypesData,
    formatUsersData,
    formatPropertiesData,
    formatReviewsData} = require("./utils.js");

const {insertPropertyTypes,
    insertUsers,
    insertProperties,
    insertReviews} = require("./insert-data");


const seed = async ({propertyTypesData, usersData, propertiesData, reviewsData}) => {

    await manageTables();

    const formattedPropertyTyoesData = formatPropertyTypesData(propertyTypesData);
    await insertPropertyTypes(formattedPropertyTyoesData);

    const formattedUsersData = formatUsersData(usersData);
    const {rows: insertedUsers} = await insertUsers(formattedUsersData);

    const usersRef = createUsersRef(insertedUsers, "first_name", "surname", "user_id"); 

    const newPropertiesData = formatDataWithRef(propertiesData, usersRef, "host_name", "host_id");
    const formattedPropertiesData = formatPropertiesData(newPropertiesData);
    const {rows: insertedProperties} = await insertProperties(formattedPropertiesData);
    
    const propertiesRef = createRef(insertedProperties, "name", "property_id");

    const newReviewsData = formatDataWithRef(reviewsData, usersRef, "guest_name", "guest_id");
    const newNewReviewsData = formatDataWithRef(newReviewsData, propertiesRef, "property_name", "property_id");
    const formattedReviewsData = formatReviewsData(newNewReviewsData);
    await insertReviews(formattedReviewsData);

}

module.exports = seed;