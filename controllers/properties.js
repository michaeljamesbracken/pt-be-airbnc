const {selectProperties,
    selectProperty,
    selectReviews,
    insertReview
} = require("../models/properties");

exports.getProperties = async (req, res, next) => {
    const properties = await selectProperties(req.query);
    res.status(200).send({properties});
};

exports.getPropertyById = async (req, res, next) => {
    const propertyID = req.params.id;
    const userID = req.query.userid;

    try {
        const property = await selectProperty(propertyID, userID);
        res.status(200).send({property});
    } catch (error) {
        next(error);
    };
};

exports.getReviews = async (req, res, next) => {
    const propertyID = req.params.id

    try{
        const reviews = await selectReviews(propertyID);
        res.status(200).send({reviews});
    } catch(error) {
        next(error);
    };
};

exports.postReview = async (req, res, next) => {
    const propertyID = req.params.id;
    const newReview = req.body;
    try {
        const review = await insertReview(propertyID, newReview);
        res.status(201).send(review[0]);
    } catch (error) {
        next(error);
    };
};