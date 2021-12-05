const db = require("../db/connection");

exports.deleteComment = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id=$1;", [comment_id])
    .then((result) => {
      const deleted = result.rowCount;
      if (deleted === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return result.rows;
      }
    });
};

exports.changeCommentVote = (comment_id, inc_votes) => {
  return db
    .query(
      `UPDATE comments 
  SET votes = votes + $1 WHERE comment_id = $2 RETURNING*;`,
      [inc_votes, comment_id]
    )
    .then((result) => {
      const comment = result.rows[0];
      if (!comment) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return result.rows[0];
      }
    });
};
