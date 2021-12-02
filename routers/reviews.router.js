const express = require("express");
const reviewsRouter = express.Router();

const {
  selectReviewsByReviewId,
  updateReviewVoteById,
  collectReviews,
  collectComments,
  addAComment,
} = require("../controllers/reviews.controller");

reviewsRouter.get("/:review_id", selectReviewsByReviewId);

reviewsRouter.patch("/:review_id", updateReviewVoteById);

reviewsRouter.get("/", collectReviews);

reviewsRouter.get("/:review_id/comments", collectComments);

reviewsRouter.post("/:review_id/comments", addAComment);

module.exports = reviewsRouter;
