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
LEFT JOIN comments ON comments.review_id=reviews.review_id WHERE reviews.category = COALESCE(null,category)  GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;

\dt 


SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;