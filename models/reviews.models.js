const db = require("../db/connection");
const { commentData } = require("../db/data/test-data");

exports.collectReviewByReviewId = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews 
    LEFT JOIN comments ON comments.review_id=reviews.review_id 
  WHERE reviews.review_id =$1 GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then((result) => {
      const review = result.rows[0];
      if (!review) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return result.rows;
      }
    });
};

exports.checkIfcategoryExists = (category) => {
  return db
    .query(`SELECT * FROM categories WHERE slug =$1;`, [category])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "Category not found" });
    });
};

exports.checkIfReviewExists = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id =$1;`, [review_id])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "Not found" });
    });
};

exports.updateReviews = (review_id, inc_votes) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 
  WHERE review_id = $2 RETURNING*;`,
      [inc_votes, review_id]
    )
    .then((result) => {
      const review = result.rows[0];
      if (!review) {
        return Promise.reject({ status: 404, msg: "no review found" });
      } else {
        return review;
      }
    });
};

exports.searchReviews = (sort_by = "created_at", order = "DESC", category) => {
  if (
    ![
      "review_id",
      "owner",
      "title",
      "review_img_url",
      "category",
      "created_at",
      "votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by query" });
  }

  const queryValues = [];
  let queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, 
  reviews.created_at, reviews.votes, COUNT(comment_id)::int AS comment_count 
  FROM reviews
  LEFT JOIN comments ON comments.review_id=reviews.review_id `;

  if (category) {
    queryValues.push(category);
    queryStr += ` WHERE category= $1`;
  }
  queryStr += `GROUP BY reviews.review_id 
ORDER BY reviews.${sort_by} ${order}`;

  if (!["ASC", "DESC"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }
  return db
    .query(queryStr, queryValues)

    .then((result) => {
      return result.rows;
    });
};

exports.searchComments = (review_id) => {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.body, users.username AS author
  FROM comments
  JOIN users ON users.username=comments.author
  WHERE comments.review_id=$1;`,
      [review_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.postAComment = (review_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (body, author, review_id) 
    VALUES ($1, $2, $3) RETURNING*;`,
      [body, username, review_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
