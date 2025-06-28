const express = require ("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {getProperties,
    getPropertyById,
    getReviews,
    postReview
} = require("./controllers/properties");

const {getUserById,
    patchUser
} = require("./controllers/users");

const {deleteReview} = require("./controllers/reviews");

const {handlePathNotFound,
    handleCustomErrors,
    handleBadRequests
} = require("./controllers/errors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.get("/api/properties/:id/reviews", getReviews);
app.post("/api/properties/:id/reviews", postReview);

app.get("/api/users/:id", getUserById);
app.patch("/api/users/:id", patchUser);

app.delete("/api/reviews/:id", deleteReview);

app.all("*invalid-path", handlePathNotFound);

app.use(handleCustomErrors);

app.use(handleBadRequests);

module.exports = app;