const {removeReview} = require("../models/reviews");

exports.deleteReview = async (req, res, next) => {

    const propertyID = req.params.id;

    try {
        await removeReview(propertyID);
        res.status(204).send();
    } catch (error) {
        next(error);
    };
};