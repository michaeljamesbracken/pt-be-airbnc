const {selectProperties,
    selectProperty,
    selectReviews
} = require("../models/properties");

exports.getProperties = async (req, res, next) => {
    const properties = await selectProperties(req.query);
    res.status(200).send({properties});
};

exports.getPropertyById = async (req, res, next) => {
    const propertyID = req.params.id;
    const userID = req.query.userid;

    const property  = await selectProperty(propertyID, userID);
    res.status(200).send({property});
};

exports.getReviews = async (req, res, next) => {
    const propertyID = req.params.id

    const reviews = await selectReviews(propertyID);
    res.status(200).send({reviews})
};