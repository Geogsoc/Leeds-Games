const express = require("express");
const reviewsRouter = require("./reviews.router.js");
const categoriesRouter = require("./categories.router.js");
const commentsRouter = require("./comments.router.js");
const apiRouter = express.Router();
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
module.exports = apiRouter;
//

const endpoints = require("../endpoints.json");

const getendpoints = (req, res, next) => {
  return Promise.resolve(endpoints)
    .then((endpoint) => {
      res.status(200).send({ endpoint });
    })
    .catch(next);
};
apiRouter.get("/", getendpoints);
