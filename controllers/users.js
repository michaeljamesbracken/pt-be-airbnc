const {selectUser} = require("../models/users");

exports.getUserById = async (req, res, next) => {
    const userID = req.params.id;

    try {
        const user = await selectUser(userID);
        res.status(200).send({user});
    } catch(error) {
        next(error);
    };
    
};