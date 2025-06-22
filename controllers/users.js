const {selectUser,
    updateUser
} = require("../models/users");

exports.getUserById = async (req, res, next) => {
    const userID = req.params.id;

    try {
        const user = await selectUser(userID);
        res.status(200).send({user});
    } catch(error) {
        next(error);
    };
    
};

exports.patchUser = async (req, res, next) => {
    const userID = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await updateUser(userID, updates);
        res.status(200).send(updatedUser[0]);
    } catch(error) {
        next(error);
    };
};