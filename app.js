const express = require ("express");

const {getProperties} = require("./controllers/properties");

const app = express();

app.get("/api/properties", getProperties);

module.exports = app;