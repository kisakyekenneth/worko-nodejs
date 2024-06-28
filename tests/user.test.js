const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("User API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let userId;

  const authHeader = `Basic ${Buffer.from(
    `${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`
  ).toString("base64")}`;

  it("should create a user", async () => {
    const res = await request(app)
      .post("/api/worko/user")
      .set("Authorization", authHeader)
      .send({
        email: "test@example.com",
        name: "Test User",
        age: 24,
        city: "Kampala",
        zipCode: "12345",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  it("should get a user by ID", async () => {
    const res = await request(app)
      .get(`/api/worko/user/${userId}`)
      .set("Authorization", authHeader);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", userId);
  });

  it("should list users", async () => {
    const res = await request(app)
      .get("/api/worko/user")
      .set("Authorization", authHeader);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a user", async () => {
    const res = await request(app)
      .put(`/api/worko/user/${userId}`)
      .set("Authorization", authHeader)
      .send({
        name: "User Test Updated",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "User Test Updated");
  });

  it("should delete a user", async () => {
    const res = await request(app)
      .delete(`/api/worko/user/${userId}`)
      .set("Authorization", authHeader);
    expect(res.statusCode).toEqual(204);
  });
});
