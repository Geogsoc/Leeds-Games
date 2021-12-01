const express = require("express");
const reviewsRouter = express.Router();

const {
  selectReviewsByReviewId,
  updateReviewVoteById,
  collectReviews,
} = require("../controllers/reviews.controller");

reviewsRouter.get("/:review_id", selectReviewsByReviewId);

reviewsRouter.patch("/:review_id", updateReviewVoteById);

reviewsRouter.get("/", collectReviews);

module.exports = reviewsRouter;
