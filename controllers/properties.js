const {selectProperties} = require("../models/properties");

exports.getProperties = async (req, res, next) => {
    const queries = req.query;
    const properties = await selectProperties(queries);
    res.status(200).send({properties});
};