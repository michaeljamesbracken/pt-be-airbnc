const {selectUser} = require("../models/users");

exports.getUserById = async (req, res, next) => {
    const userID = req.params.id;

    const user = await selectUser(userID);
    res.status(200).send({user});
};