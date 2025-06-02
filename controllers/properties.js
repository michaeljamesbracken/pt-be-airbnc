const {selectProperties,
    selectProperty
} = require("../models/properties");

exports.getProperties = async (req, res, next) => {
    const properties = await selectProperties(req.query);
    res.status(200).send({properties});
};

exports.getPropertyById = async (req, res, next) => {
    const {id} = req.params;
    const property  = await selectProperty(id);
    res.status(200).send({property});
};