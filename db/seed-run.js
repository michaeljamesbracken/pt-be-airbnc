const seed = require("./seed.js");
const db = require("./connection")

seed().then(() => {
    db.end
});