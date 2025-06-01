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
        test("responds with an array that is sorted from most favourites to least by default", async () => {
            const {body} = await request(app).get("/api/properties");

            expect(body.properties[0].property_name).toBe("Charming Studio Retreat");
            expect(body.properties[5].property_name).toBe("Modern Apartment in City Center");
            expect(body.properties[10].property_name).toBe("Luxury Penthouse with View");
        });
        describe("Queries Testing", () => {
            describe("Filter Testing", () => {
                describe("?maxprice= Testing", () => {
                    test("responds with an array of properties with price_per_night <= the passed value", async () => {
                        
                        const maxPrice = 100;

                        const {body} = await request(app).get(`/api/properties?maxprice=${maxPrice}`);
                        
                        expect(body.properties.length).toBe(4);

                        body.properties.forEach(property => {
                        expect(property.price_per_night <= maxPrice).toBe(true);
                        });

                    });
                });
                describe("?minprice= Testing", () => {
                    test("responds with an array of properties with price_per_night >= the passed value", async () => {
                                                
                        const minPrice = 120;

                        const {body} = await request(app).get(`/api/properties?minprice=${minPrice}`);
                        
                        expect(body.properties.length).toBe(6);
                        
                        body.properties.forEach(property => {
                        expect(property.price_per_night >= minPrice).toBe(true);
                        });

                    });
                });
                describe("?host= Testing", () => {
                    test("responds with an array of properties with host_id = the passed value", async () => {
                        const testHost = 1;
                        
                        const {body} = await request(app).get(`/api/properties?host=${testHost}`);
                        
                        expect(body.properties.length).toBe(5);
                        
                        body.properties.forEach(property => {
                        expect(property.host).toBe("Alice Johnson");
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