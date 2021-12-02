const express = require("express");
const commentsRouter = express.Router();

const { removeAComment } = require("../controllers/comments.controller");

commentsRouter.delete("/:comment_id", removeAComment);

module.exports = commentsRouter;
