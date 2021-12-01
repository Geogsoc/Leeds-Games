const db = require("../connection.js");
const format = require("pg-format");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users(username VARCHAR(200) PRIMARY KEY, 
        avatar_url VARCHAR(250), name TEXT NOT NULL);`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE categories(slug VARCHAR(200) PRIMARY KEY, 
          description TEXT NOT NULL);`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE reviews(review_id SERIAL PRIMARY KEY, 
            title VARCHAR(300) NOT NULL, review_body TEXT NOT NULL, 
            designer VARCHAR(400) NOT NULL, 
            review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg' NOT NULL,
            votes INT DEFAULT 0 NOT NULL, category VARCHAR (200) REFERENCES categories(slug) ON DELETE CASCADE NOT NULL, owner VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE NOT NULL, created_at TIMESTAMP DEFAULT NOW() 
              );`
      );
      //
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments(comment_id SERIAL PRIMARY KEY,author VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE NOT NULL, review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE NOT NULL, 
        votes INT DEFAULT 0 NOT NULL, created_at TIMESTAMP DEFAULT NOW(), body TEXT NOT NULL);`
      );
    })
    .then(() => {
      const formatteduser = userData.map((user) => {
        return [user.username, user.avatar_url, user.name];
      });
      const querystr = format(
        `INSERT INTO users(username, avatar_url, name) VALUES %L;`,
        formatteduser
      );
      return db.query(querystr);
    })
    .then(() => {
      const formattedcategory = categoryData.map((categ) => {
        return [categ.slug, categ.description];
      });
      const querystr1 = format(
        `INSERT INTO categories(slug, description) VALUES %L;`,
        formattedcategory
      );
      return db.query(querystr1);
    })
    .then(() => {
      const formattedreview = reviewData.map((revs) => {
        return [
          revs.title,
          revs.review_body,
          revs.designer,
          revs.review_img_url,
          revs.votes,
          revs.category,
          revs.owner,
          revs.created_at,
        ];
      });
      const querystr2 = format(
        `INSERT INTO reviews(title, review_body, designer, review_img_url, votes,
    category, owner, created_at) VALUES %L;`,
        formattedreview
      );
      return db.query(querystr2);
    })
    .then(() => {
      const formattedcomment = commentData.map((coms) => {
        return [
          coms.author,
          coms.review_id,
          coms.votes,
          coms.created_at,
          coms.body,
        ];
      });
      const querystr3 = format(
        `INSERT INTO comments(author, review_id,votes, created_at, body) VALUES %L;`,
        formattedcomment
      );
      return db.query(querystr3);
    });
};

module.exports = seed;
