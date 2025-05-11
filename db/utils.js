function formatPropertiesData(properties, users){
    return properties.map((property) => { 
        users.forEach((user) => {
            const userName = user.first_name + " " + user.surname
            if (property.host_name === userName){
                property.host_id = users.indexOf(user) + 1
                delete property.host_name
            }
        })
        return [property.host_id,
            property.name,
            property.location,
            property.property_type,
            property.price_per_night,
            property.description
        ]
    })
}

function formatPropertyTypesData(propertyTypes){
    return propertyTypes.map(({property_type, description}) => [property_type, description])
}

function formatReviewsData(reviews){

}

function formatUsersData(users){
    return users.map(({first_name, surname, email, phone_number, role, avatar}) => {
        if(role === "host"){
            role = "true"
        } else {
            role = "false"
        }
        return [first_name, surname, email, phone_number, role, avatar]
    })
}


module.exports = {formatPropertiesData,
    formatPropertyTypesData,
    formatReviewsData,
    formatUsersData
}