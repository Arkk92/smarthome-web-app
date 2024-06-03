import { app } from "@/presentation/express/settings/app";
import request from "supertest";

describe("WeekSchedule API", () => {
  beforeAll(async () => {
    const weekMeals = [
      {
        name: "breakfast 1",
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
      },
      {
        name: "lunch 1",
        mealTime: "Lunch",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1 },
          { name: "Ingredient 2", quantity: 2 },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "breakfast 2",
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
      },
      {
        name: "lunch 2",
        mealTime: "Lunch",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1 },
          { name: "Ingredient 2", quantity: 2 },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "dinner 1",
        mealTime: "Dinner",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1 },
          { name: "Ingredient 2", quantity: 2 },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "dinner 2",
        mealTime: "Dinner",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1 },
          { name: "Ingredient 2", quantity: 2 },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
    ];
    let res;
    for (var meal of weekMeals) {
      res = await request(app).post("/meal").send(meal);
      expect(res.statusCode).toEqual(201);
    }
    res = await request(app).get("/meal/all").query({ page: 0 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.body.length).toEqual(weekMeals.length);
  });
  it("should create a new weekSchedule", async () => {
    const newWeekSchedule = {
      period: {
        start: "2024-01-01",
        end: "2024-01-07",
      },
    };

    const response = await request(app)
      .post("/weekSchedule/season/Warm/babyAllowed/true")
      .send(newWeekSchedule)
    
    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.period).toMatchObject(newWeekSchedule.period);
  });

  //   it("should retrieve all weekSchedules", async () => {
  //     const response = await request(app).get("/weekSchedule/all").expect(200);

  //     expect(Array.isArray(response.body)).toBe(true);
  //   });

  //   it("should get a weekSchedule by date", async () => {
  //     const date = "2024-01-01";

  //     const response = await request(app)
  //       .get(`/weekSchedule/date/${date}`)
  //       .expect(200);

  //     expect(response.body.period.start).toBe(date);
  //   });

  //   it("should get a weekSchedule by ID", async () => {
  //     const id = "some-existing-id";

  //     const response = await request(app)
  //       .get(`/weekSchedule/id/${id}`)
  //       .expect(200);

  //     expect(response.body).toHaveProperty("_id", id);
  //   });

  //   it("should update a weekSchedule", async () => {
  //     const id = "some-existing-id";
  //     const updatedData = {
  //       period: {
  //         start: "2024-02-01",
  //         end: "2024-02-07",
  //       },
  //     };

  //     const response = await request(app)
  //       .patch(`/weekSchedule/update/id/${id}`)
  //       .send(updatedData)
  //       .expect(200);

  //     expect(response.body.period).toMatchObject(updatedData.period);
  //   });

  //   it("should delete a weekSchedule", async () => {
  //     const id = "some-existing-id";

  //     const response = await request(app)
  //       .delete(`/weekSchedule/delete/id/${id}`)
  //       .expect(200);

  //     expect(response.body).toHaveProperty("_id", id);
  //   });
});
