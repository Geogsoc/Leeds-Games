const {
  collectReviewByReviewId,
  checkIfReviewExists,
  updateReviews,
  searchReviews,
} = require("../models/reviews.models");

exports.selectReviewsByReviewId = (req, res, next) => {
  const { review_id } = req.params;

  Promise.all([
    collectReviewByReviewId(review_id),
    checkIfReviewExists(review_id),
  ])
    .then(([review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.updateReviewVoteById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateReviews(review_id, inc_votes)
    .then((updatedReview) => {
      res.status(200).send({ updatedReview });
    })
    .catch(next);
};

exports.collectReviews = (req, res, next) => {
  console.log("inside the collect reviews controller");
  const { sort_by, order, category } = req.query;
  searchReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};
