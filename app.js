const express = require ("express");
const bodyParser = require("body-parser");

const {getProperties,
    getPropertyById,
    getReviews
} = require("./controllers/properties");

const {getUserById} = require("./controllers/users");

const {postReview} = require("./controllers/reviews");

const {handlePathNotFound,
    handleCustomErrors,
    handleBadRequests
} = require("./controllers/errors");

const app = express();
app.use(bodyParser.json());

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.get("/api/properties/:id/reviews", getReviews);

app.post("/api/properties/:id/reviews", postReview);

app.get("/api/users/:id", getUserById);

app.all("*invalid-path", handlePathNotFound);

app.use(handleCustomErrors);

app.use(handleBadRequests);

module.exports = app;