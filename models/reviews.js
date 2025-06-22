const db = require("../db/connection");

exports.removeReview = async (reviewID) => {

    const standardQuery = `DELETE
    FROM
    reviews
    WHERE
    review_id = $1`;

    await db.query(standardQuery, [reviewID]);
};