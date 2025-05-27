const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seed.js");
const data = require("../db/data/test");

beforeEach(async() => {
    await seed(data);
});

describe("app.js Testing", () => {
    describe("GET /api/properties Testing", () => {
        test("responds with status code: 200", async () => {
            await request(app).get("/api/properties").expect(200);
        });
        test("responds with an array of properties that contains {property_id, property_name, location, price_per_night, host}", async () => {
            const {body} = await request(app).get("/api/properties");

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
        describe("Queries Testing", () => {
            describe("Filter Testing", () => {
                describe("?maxprice= Testing", () => {
                    test("responds with an array of properties with price_per_night <= the passed value", async () => {
                        
                        // Minimum price_per_night from the test data is 85.0

                        const maxPrice = 90;

                        const {body} = await request(app).get(`/api/properties?maxprice=${maxPrice}`);
                        
                        expect(body.properties.length > 0).toBe(true);

                        body.properties.forEach(property => {
                        expect(property.price_per_night <= maxPrice).toBe(true);
                        });

                    });
                });
                describe("?minprice= Testing", () => {
                    test("responds with an array of properties with price_per_night >= the passed value", async () => {
                        
                        // Maximum price_per_night from the test data is 250.0
                        
                        const minPrice = 120;

                        const {body} = await request(app).get(`/api/properties?minprice=${minPrice}`);
                        
                        expect(body.properties.length > 0).toBe(true);
                        
                        body.properties.forEach(property => {
                        expect(property.price_per_night >= minPrice).toBe(true);
                        });

                    });
                });
                describe("?host= Testing", () => {
                    test("responds with an array of properties with host_id = the passed value", async () => {
                        
                        // Host_ids from the test data are: 1 (Alice Johnson), 3 (Emma Davis), 5 (Isabella Martinez)
                        
                        const hosts = {
                            1: "Alice Johnson",
                            3: "Emma Davis",
                            5: "Isabella Martinez"
                        };

                        const testHost = 1;

                        const {body} = await request(app).get(`/api/properties?host=${testHost}`);
                        
                        console.log(body);

                        expect(body.properties.length > 0).toBe(true);
                        
                        body.properties.forEach(property => {
                        expect(property.host).toBe(hosts[testHost]);
                        });

                    });
                });
            });
            describe("Sort Testing", () => {
                describe("?sort= Testing", () => {

                });
                describe("?order= Testing", () => {

                });
            });
            
        });
    });
});