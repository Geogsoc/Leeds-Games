\c nc_games_test

-- SELECT * FROM reviews;



-- -- SELECT * FROM categories;



-- -- SELECT * FROM users;



-- SELECT * FROM comments;
-- SELECT reviews.*, COUNT(author) AS comment_count FROM reviews 
--   LEFT JOIN comments ON comments.review_id=reviews.review_id 
-- WHERE reviews.review_id = 1 GROUP BY reviews.review_id;

-- UPDATE reviews SET votes = votes + 3 WHERE review_id = 1 RETURNING*;

SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, COUNT(author) AS comment_count 
FROM reviews
LEFT JOIN comments ON comments.review_id=reviews.review_id WHERE reviews.category = COALESCE('social deduction', category)  GROUP BY reviews.review_id ORDER BY reviews.created_at ASC;

SELECT * FROM users WHERE username = 'mallionare';
-- SELECT comments.comment_id, comments.votes, comments.created_at, comments.body, users.username AS author
--   FROM comments
--   JOIN users ON users.username=comments.author
--   WHERE comments.review_id=2;


-- INSERT INTO comments (body, author, review_id) VALUES ('i liked it','philippaclaire9', 2) RETURNING comments.body;



\dt 


SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;