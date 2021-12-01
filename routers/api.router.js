//const { application } = require("express");

const express = require("express");
const reviewsRouter = require("./reviews.router.js");
const categoriesRouter = require("./categories.router.js");
const apiRouter = express.Router();
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
