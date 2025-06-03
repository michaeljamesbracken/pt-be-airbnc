const express = require ("express");

const {getProperties,
    getPropertyById,
    getReviews
} = require("./controllers/properties");

const {getUserById} = require("./controllers/users");

const {handlePathNotFound} = require("./controllers/errors");

const app = express();

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.get("/api/properties/:id/reviews", getReviews);

app.get("/api/users/:id", getUserById);

app.all("*invalid-path", handlePathNotFound);

module.exports = app;