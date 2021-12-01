const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("GET api/categories", () => {
  test("Responds status 200 with all categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        expect(res.body.categories).toBeInstanceOf(Array);
        expect(res.body.categories).toHaveLength(4);
        res.body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  test("Responds with error 404 with invalid route", () => {
    return request(app).get("/api/categ").expect(404);
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("Responds status 200 with a specific review and correct comment count", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((res) => {
        expect(res.body.review).toBeInstanceOf(Array);
        expect(res.body.review).toHaveLength(1);

        expect(res.body.review[0]).toEqual({
          owner: expect.any(String),
          title: expect.any(String),
          review_id: expect.any(Number),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          category: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String),
        });
      });
  });

  test("Responds status 404 with a review id that does not exist", () => {
    return request(app)
      .get("/api/reviews/900")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid request");
      });
  });
  test("Responds status 400 with a review id that id not valid", () => {
    return request(app)
      .get("/api/reviews/cheeseburger")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("Responds status 200 with an object containing review with updated votes", () => {
    const inc_votes = { inc_votes: 2 };
    return request(app)
      .patch("/api/reviews/1")
      .send(inc_votes)
      .expect(200)
      .then((response) => {
        expect(response.body.updatedReview).toEqual(
          expect.objectContaining({
            review_id: 1,
            title: "Agricola",
            designer: "Uwe Rosenberg",
            owner: "mallionaire",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Farmyard fun!",
            category: "euro game",
            created_at: expect.any(String),
            votes: 3,
          })
        );
      });
  });
});

describe("GET api/reviews", () => {
  test("Responds status 200 with all reviews in descending date order as default", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toBeInstanceOf(Array);
        expect(res.body.reviews).toHaveLength(13);
        res.body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
        expect(res.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});
