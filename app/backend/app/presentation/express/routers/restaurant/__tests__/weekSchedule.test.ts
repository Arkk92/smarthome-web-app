import { app } from "@/presentation/express/settings/app";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import request from "supertest";

describe("WeekSchedule API", () => {
  beforeEach(async () => {
    await mongooseClient.dropDatabase()
    const weekMeals = [
      {
        name: "breakfast 1",
        mealTime: "Breakfast",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 0,
      },
      {
        name: "lunch 1",
        mealTime: "Lunch",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 2,
      },
      {
        name: "breakfast 2",
        mealTime: "Breakfast",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 0,
      },
      {
        name: "breakfast 3",
        mealTime: "Breakfast",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 0,
      },
      {
        name: "breakfast 4",
        mealTime: "Breakfast",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 0,
      },
      {
        name: "lunch 2",
        mealTime: "Lunch",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 2,
      },
      {
        name: "lunch 3",
        mealTime: "Lunch",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 3,
      },
      {
        name: "dinner 1",
        mealTime: "Dinner",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 2,
      },
      {
        name: "dinner 2",
        mealTime: "Dinner",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 2,
      },
      {
        name: "dinner 3",
        mealTime: "Dinner",
        ingridientList: [
          { name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" },
          { name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" },
        ],
        isVegetarian: true,
        season: "Any",
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 3,
      },
    ];
    let res;
    for (var meal of weekMeals) {
      res = await request(app).post("/meal").send(meal);
      expect(res.statusCode).toEqual(201);
    }
    res = await request(app).get("/meal/all").query({ page: 0 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(weekMeals.length);
  });
  afterAll(async () => {
    await mongooseClient.disconnect()
  });

  it("should create a new weekSchedule", async () => {
    const newWeekSchedule = {
      period: {
        start: "06-03-2024",
        end: "06-10-2024",
      },
    };

    const response = await request(app)
      .post("/weekSchedule/season/Any/babyAllowed/false")
      .send(newWeekSchedule);

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("_id");
    const periodToCheck = {
      start: new Date(newWeekSchedule.period.start),
      end: new Date(newWeekSchedule.period.end),
    };
    expect(new Date(response.body.period.start).toDateString()).toEqual(
      periodToCheck.start.toDateString()
    );
    expect(new Date(response.body.period.end).toDateString()).toEqual(
      periodToCheck.end.toDateString()
    );
    expect(response.body.weekDays).toHaveLength(7);
  });

  it("should retrieve all weekSchedules", async () => {
    // Create some week schedules
    const newWeekScheduleList = [
      {
        period: {
          start: "06-17-2024",
          end: "06-24-2024",
        },
      },
      {
        period: {
          start: "06-10-2024",
          end: "06-17-2024",
        },
      },
    ];
    let response = await request(app)
      .post("/weekSchedule/season/Any/babyAllowed/false")
      .send(newWeekScheduleList[0]);
    expect(response.statusCode).toBe(201);

    response = await request(app)
      .post("/weekSchedule/season/Any/babyAllowed/false")
      .send(newWeekScheduleList[1]);
    expect(response.statusCode).toBe(201);

    response = await request(app).get("/weekSchedule/all").query({ page: 0 });
    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(newWeekScheduleList.length);
  });

  it("should get a weekSchedule by date", async () => {
    const newWeekSchedule = {
      period: {
        start: "06-03-2024",
        end: "06-10-2024",
      },
    };

    let response = await request(app)
      .post("/weekSchedule/season/Any/babyAllowed/false")
      .send(newWeekSchedule);

    expect(response.statusCode).toBe(201);

    const date = newWeekSchedule.period.start;
    response = await request(app)
      .get(`/weekSchedule/date/${date}`)
      .expect(200);

      expect(new Date(response.body.period.start).toDateString()).toEqual(
        new Date(newWeekSchedule.period.start).toDateString()
      );
  });

  it("should get a weekSchedule by ID", async () => {
    const newWeekSchedule = {
      period: {
        start: "06-03-2024",
        end: "06-10-2024",
      },
    };

    let response = await request(app)
      .post("/weekSchedule/season/Any/babyAllowed/false")
      .send(newWeekSchedule);

    expect(response.statusCode).toBe(201);

    const id = response.body._id;

    response = await request(app)
      .get(`/weekSchedule/id/${id}`)
      .expect(200);

    expect(response.body).toHaveProperty("_id", id);
  });

  it("should update a weekSchedule", async () => {
    const newWeekSchedule = {
      period: {
        start: "06-03-2024",
        end: "06-10-2024",
      },
    };

    let response = await request(app)
      .post("/weekSchedule/season/Any/babyAllowed/false")
      .send(newWeekSchedule);

    expect(response.statusCode).toBe(201);

    const id = response.body._id;
    
    const updatedData = {
      period: {
        start: "2024-02-01",
        end: "2024-02-07",
      },
    };

    response = await request(app)
      .patch(`/weekSchedule/update/id/${id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.period).toMatchObject({
      start: new Date(updatedData.period.start).toISOString(),
      end: new Date(updatedData.period.end).toISOString(),
    });
  });

  it("should delete a weekSchedule", async () => {
    const newWeekSchedule = {
      period: {
        start: "06-03-2024",
        end: "06-10-2024",
      },
    };

    let response = await request(app)
      .post("/weekSchedule/season/Any/babyAllowed/false")
      .send(newWeekSchedule);

    expect(response.statusCode).toBe(201);

    const id = response.body._id;

    response = await request(app)
      .delete(`/weekSchedule/delete/id/${id}`)
      .expect(200);

    response = await request(app)
      .get(`/weekSchedule/id/${id}`)
      .expect(404);
  });
});
