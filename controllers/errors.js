
exports.handlePathNotFound = (req, res, next) => {
    res.status(404).send({msg: "Path not found."});
};

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status){
        res.status(err.status).send({msg: err.msg});
    } else {
        next(err);
    };
};

exports.handleBadRequests = (err, req, res, next) => {
    res.status(400).send({msg: "Bad Request."});
};