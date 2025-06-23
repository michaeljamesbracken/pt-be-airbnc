const db = require("./connection");

const seed = require("./seed.js");

const data = require("./data/dev");

seed(data).then(() => {
    db.end();
});