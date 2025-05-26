const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seed.js");
const data = require("../db/data/test");

beforeEach(async() => {
    await seed(data);
});

describe("app.js tesing", () => {
    describe("GET /api/properties testing", () => {
        test("respond with status code: 200", async () => {
            await request(app).get("/api/properties").expect(200);
        });
        test("responds with an array of properties that contains {property_id, property_name, location, price_per_night, host}", async () => {
            const {body} = await request(app).get("/api/properties").expect(200);
            expect(Array.isArray(body.properties)).toBe(true);

            expect(body.properties.length > 0).toBe(true);

            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);
                expect(property.hasOwnProperty("price_per_night")).toBe(true);
                expect(property.hasOwnProperty("host")).toBe(true);
            });
        });
    });
});