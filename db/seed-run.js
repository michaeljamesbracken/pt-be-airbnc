const db = require("./connection");

const seed = require("./seed.js");

const data = require("./data/test");

seed(data).then(() => {
    db.end();
});