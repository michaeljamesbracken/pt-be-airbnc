exports.createRef = (arr, prop1, prop2) => {
    const obj = {};
    arr.forEach((element) => {
        obj[element[prop1]] = element[prop2]
    });
    return obj;
};

exports.createUsersRef = (users) => {
    const obj = {};
    users.forEach((user) => {
        const userName = user.first_name + " " + user.surname
        obj[userName] = user.user_id;
    });
    return obj;
};

exports.formatDataWithRef = (data, refObj, keyToRemove, keyToAdd) => {
    return data.map(({ [keyToRemove]: removedKey, ...row }) => {
        return { ...row, [keyToAdd]: refObj[removedKey] };
    });
};

exports.formatPropertyTypesData = (propertyTypes) => {
    return propertyTypes.map(({property_type, description}) => [property_type, description])
};

exports.formatUsersData = (users) => {
    return users.map(({first_name, surname, email, phone_number, role, avatar}) => {
        role === "host" ? role = "true" :role = "false"
        return [first_name, surname, email, phone_number, role, avatar]
    })
};

exports.formatPropertiesData = (properties) => {
    return properties.map(({host_id, name, location, property_type, price_per_night, description}) => 
        [host_id, name, location, property_type, price_per_night, description])
};

exports.formatReviewsData = (reviews) => {
    return reviews.map(({property_id, guest_id, rating, comment}) => 
    [property_id, guest_id, rating, comment]);
};

exports.formatFavouritesData = (favourites) => {
    return favourites.map(({guest_id, property_id}) => 
    [guest_id, property_id]);
};

