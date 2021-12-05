// const { userData } = require("../db/data/test-data");
const {
  collectReviewByReviewId,
  checkIfReviewExists,
  updateReviews,
  searchReviews,
  searchComments,
  postAComment,
  checkIfcategoryExists,
  deleteComment,
} = require("../models/reviews.models");

exports.selectReviewsByReviewId = (req, res, next) => {
  const { review_id } = req.params;

  collectReviewByReviewId(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.updateReviewVoteById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;

  updateReviews(review_id, inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.collectReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;

  if (!category) {
    searchReviews(sort_by, order)
      .then((reviews) => {
        res.status(200).send({ reviews });
      })
      .catch(next);
  } else {
    Promise.all([
      searchReviews(sort_by, order, category),
      checkIfcategoryExists(category),
    ])
      .then(([reviews]) => {
        res.status(200).send({ reviews });
      })
      .catch(next);
  }
};

exports.collectComments = (req, res, next) => {
  const { review_id } = req.params;

  Promise.all([searchComments(review_id), checkIfReviewExists(review_id)])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addAComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;

  postAComment(review_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
