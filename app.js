const express = require ("express");

const {getProperties,
    getPropertyById
} = require("./controllers/properties");

const app = express();

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

module.exports = app;