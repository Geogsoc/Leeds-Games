const express = require("express");
const commentsRouter = express.Router();

const {
  removeAComment,
  editCommentVote,
} = require("../controllers/comments.controller");

commentsRouter.delete("/:comment_id", removeAComment);
commentsRouter.patch("/:comment_id", editCommentVote);
module.exports = commentsRouter;
