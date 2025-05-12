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

function formatReviewsData(reviews, properties, users){
    return reviews.map((review) => {
        users.forEach((user) => {
            
            const userName = user.first_name + " " + user.surname
            if (review.guest_name === userName){
                review.guest_id = users.indexOf(user) + 1
                delete review.guest_name
            }
        })
        properties.forEach((property) => {
            if (review.property_name === property.name){
                review.property_id = properties.indexOf(property) + 1
                delete review.property_name
            }
        })
        
        return [review.property_id,
            review.guest_id,
            review.rating,
            review.comment]
    })
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