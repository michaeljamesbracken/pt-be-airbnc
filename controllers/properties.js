const {selectProperties} = require("../models/properties");

exports.getProperties = async (req, res, next) => {
    const properties = await selectProperties(req.query);
    res.status(200).send({properties});
};