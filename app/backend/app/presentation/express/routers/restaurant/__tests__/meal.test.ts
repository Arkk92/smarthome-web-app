import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

import request from "supertest";
import { app } from "@/presentation/express/settings/app";
import { mongooseClient } from '@/restaurant/infra/database/connect';

describe("Meal Endpoints", () => {

  afterAll(async () => {
    await mongooseClient.disconnect()
  });

  beforeEach(async () => {
    await mongooseClient.dropDatabase()
  });

  it("should create a new meal", async () => {
    const res = await request(app)
      .post("/meal")
      .send({
        name: "Test Meal",
        mealTime: "Breakfast",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1 },
          { name: "Ingredient 2", quantity: 2 },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      name: "Test Meal",
      mealTime: "Breakfast",
      isVegetarian: true,
      season: "Any",
      babyAllowed: false,
      batchMealCount: 5,
    });
    expect(res.body).toHaveProperty("_id");
    expect(res.body.ingridientList).toHaveLength(2);
    // Add more assertions as needed
  });

  it("should retrieve all meals", async () => {
    // Create some test meals in the database
    const meal1 = await request(app)
      .post("/meal")
      .send({
        name: "Test Meal 1",
        mealTime: "Breakfast",
        ingridientList: [],
        isVegetarian: false,
        season: "Warm",
        babyAllowed: true,
        recipe: ["Step 1"],
        batchMealCount: 10,
      });

    const meal2 = await request(app)
      .post("/meal")
      .send({
        name: "Test Meal 2",
        mealTime: "Lunch",
        ingridientList: [],
        isVegetarian: true,
        season: "Cold",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 8,
      });

    const res = await request(app).get("/meal/all").query({ page: 0 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.body).toContainEqual(
      expect.objectContaining({
        name: "Test Meal 1",
        mealTime: "Breakfast",
        isVegetarian: false,
        season: "Warm",
        babyAllowed: true,
        batchMealCount: 10,
      })
    );
    expect(res.body.body).toContainEqual(
      expect.objectContaining({
        name: "Test Meal 2",
        mealTime: "Lunch",
        isVegetarian: true,
        season: "Cold",
        babyAllowed: false,
        batchMealCount: 8,
      })
    );
    // Add more assertions as needed
  });

  it("should get meal by ID", async () => {
    const newMeal = await request(app)
      .post("/meal")
      .send({
        name: "Test Meal",
        mealTime: "Breakfast",
        ingridientList: [],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1"],
        batchMealCount: 5,
      });

    const res = await request(app).get(`/meal/id/${newMeal.body._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      name: "Test Meal",
      mealTime: "Breakfast",
      isVegetarian: true,
      season: "Any",
      babyAllowed: false,
      batchMealCount: 5,
    });
    // Add more assertions as needed
  });

  it("should get meal by name", async () => {
    const newMeal = await request(app)
      .post("/meal")
      .send({
        name: "Test Meal",
        mealTime: "Breakfast",
        ingridientList: [],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1"],
        batchMealCount: 5,
      });

    const res = await request(app).get(
      `/meal/name/${encodeURIComponent("Test Meal")}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      name: "Test Meal",
      mealTime: "Breakfast",
      isVegetarian: true,
      season: "Any",
      babyAllowed: false,
      batchMealCount: 5,
    });
    // Add more assertions as needed
  });

  it("should update meal by ID", async () => {
    const newMeal = await request(app)
      .post("/meal")
      .send({
        name: "Test Meal",
        mealTime: "Breakfast",
        ingridientList: [],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1"],
        batchMealCount: 5,
      });

    const res = await request(app)
      .patch(`/meal/update/id/${newMeal.body._id}`)
      .send({
        name: "Updated Meal",
        mealTime: "Lunch",
        ingridientList: [],
        isVegetarian: false,
        season: "Warm",
        babyAllowed: true,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 8,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      name: "Updated Meal",
      mealTime: "Lunch",
      isVegetarian: false,
      season: "Warm",
      babyAllowed: true,
      batchMealCount: 8,
    });
    // Add more assertions as needed
  });

  it("should delete meal by ID", async () => {
    const newMeal = await request(app)
      .post("/meal")
      .send({
        name: "Test Meal",
        mealTime: "Breakfast",
        ingridientList: [],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1"],
        batchMealCount: 5,
      });

    const res = await request(app).delete(
      `/meal/delete/id/${newMeal.body._id}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      error: "Meal deleted with success!"
    });
    // Add more assertions as needed
  });
});
