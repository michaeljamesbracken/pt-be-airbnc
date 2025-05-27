const db = require("./connection");
const format = require("pg-format");

const {manageTables} = require("./manage-tables");

const {createRef,
    createUsersRef,
    formatDataWithRef,
    formatPropertyTypesData,
    formatUsersData,
    formatPropertiesData,
    formatReviewsData,
    formatFavouritesData} = require("./utils.js");

const {insertPropertyTypes,
    insertUsers,
    insertProperties,
    insertReviews,
    insertFavourites} = require("./insert-data");


const seed = async ({propertyTypesData, usersData, propertiesData, reviewsData, favouritesData}) => {

    await manageTables();

    const formattedPropertyTyoesData = formatPropertyTypesData(propertyTypesData);
    await insertPropertyTypes(formattedPropertyTyoesData);

    const formattedUsersData = formatUsersData(usersData);
    const {rows: insertedUsers} = await insertUsers(formattedUsersData);

    const usersRef = createUsersRef(insertedUsers); 

    propertiesData = formatDataWithRef(propertiesData, usersRef, "host_name", "host_id");

    const formattedPropertiesData = formatPropertiesData(propertiesData);
    const {rows: insertedProperties} = await insertProperties(formattedPropertiesData);
    
    const propertiesRef = createRef(insertedProperties, "name", "property_id");

    reviewsData = formatDataWithRef(reviewsData, usersRef, "guest_name", "guest_id");
    reviewsData = formatDataWithRef(reviewsData, propertiesRef, "property_name", "property_id");
    const formattedReviewsData = formatReviewsData(reviewsData);
    await insertReviews(formattedReviewsData);

    favouritesData = formatDataWithRef(favouritesData, usersRef, "guest_name", "guest_id");
    favouritesData = formatDataWithRef(favouritesData, propertiesRef, "property_name", "property_id");
    const formattedFavouritesData = formatFavouritesData(favouritesData);
    await insertFavourites(formattedFavouritesData);
};

module.exports = seed;