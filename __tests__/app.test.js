const request = require("supertest");
const app = require("../app.js");
const bodyParser = require("body-parser");
const seed = require("../db/seed.js");
const data = require("../db/data/test");
const db = require("../db/connection.js");

app.use(bodyParser.json());

beforeEach(async() => {
    await seed(data);
});

afterAll(() => {
    db.end();
});

describe("app.js Testing", () => {
    describe("Default Error Handling", () => {
        describe("Invalid Path", () => {
            test("Responds with status code: 404, and msg: Path not found.", async () => {
                const {body} = await request(app).get("/non-existant-path").expect(404);
                expect(body.msg).toBe("Path not found.");
            });
        });

        // handleCustomErros will be tested in the operations error handling

        describe("Bad Request", () => {
            test("Responds with status code: 400, and msg: Bad Request.", async () => {
                const {body} = await request(app).get("/api/properties/house").expect(400);
                expect(body.msg).toBe("Bad Request.");
            });
        });
    });
    describe("GET /api/properties Testing", () => {
        test("responds with status code: 200", async () => {
            await request(app).get("/api/properties").expect(200);
        });
        test("responds with an array of properties that contains {property_id, property_name, location, price_per_night, host}", async () => {
            const {body} = await request(app).get("/api/properties");

            expect(Array.isArray(body.properties)).toBe(true);

            expect(body.properties.length > 0).toBe(true);

            body.properties.forEach(property => {
                expect(Object.keys(property).length).toBe(5);

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
    describe("GET /api/properties/:id Testing", () => {
        test("responds with status code: 200", async () => {
            await request(app).get("/api/properties/1").expect(200);
        });
        test("responds with an array of a single property that contains {property_id, property_name, location, price_per_night, description, host, host_avatar, favourite_count}", async () => {
            const {body} = await request(app).get("/api/properties/1");

            expect(Array.isArray(body.property)).toBe(true);

            expect(body.property.length).toBe(1);

            expect(body.property[0].hasOwnProperty("property_id")).toBe(true);
            expect(body.property[0].hasOwnProperty("property_name")).toBe(true);
            expect(body.property[0].hasOwnProperty("location")).toBe(true);
            expect(body.property[0].hasOwnProperty("price_per_night")).toBe(true);
            expect(body.property[0].hasOwnProperty("description")).toBe(true);
            expect(body.property[0].hasOwnProperty("host")).toBe(true);
            expect(body.property[0].hasOwnProperty("host_avatar")).toBe(true);
            expect(body.property[0].hasOwnProperty("favourite_count")).toBe(true);
        });
        describe("Queries Testing", () => {
            describe("?user_id= Testing", () => {

            });
        });
        describe("Error Testing", () => {
            test("Invalid property ID returns 400 - Bad Request.", async () => {
                const {body} = await request(app).get("/api/properties/house").expect(400);
                expect(body.msg).toBe("Bad Request.");
            });
            test("Valid but non-existent property Id returns 404 - Not Found.", async () => {
                const {body} = await request(app).get("/api/properties/999").expect(404);
                expect(body.msg).toBe("Property Not Found.");
            });
        });
    });
    describe("GET /api/properties/:id/reviews Testing", () => {
        test("responds with status code: 200", async () => {
            await request(app).get("/api/properties/1/reviews").expect(200);
        });
        test("responds with an array of reviews for a single property that contains {review_id, comment, rating, created_at, guest, guest_avatar}", async () => {
            const {body} = await request(app).get("/api/properties/1/reviews");

            expect(Array.isArray(body.reviews)).toBe(true);

            expect(body.reviews.length > 0).toBe(true);

            body.reviews.forEach(review => {
                expect(Object.keys(review).length).toBe(6);

                expect(review.hasOwnProperty("property_id")).toBe(true);
                expect(review.hasOwnProperty("comment")).toBe(true);
                expect(review.hasOwnProperty("rating")).toBe(true);
                expect(review.hasOwnProperty("created_at")).toBe(true);
                expect(review.hasOwnProperty("guest")).toBe(true);
                expect(review.hasOwnProperty("guest_avatar")).toBe(true);
            });

        });
    });
    describe("GET /api/users/:id Testing", () => {
        test("responds with status code: 200", async () => {
            await request(app).get("/api/users/1").expect(200);
        });
        test("responds with an array of a single user object that contains {user_id, first_name, surname, email, phone_number, avatar, created_at}", async () => {
            const {body} = await request(app).get("/api/users/1");

            expect(Array.isArray(body.user)).toBe(true);

            expect(body.user.length).toBe(1);

            expect(Object.keys(body.user[0]).length).toBe(7);

            expect(body.user[0].hasOwnProperty("user_id")).toBe(true);
            expect(body.user[0].hasOwnProperty("first_name")).toBe(true);
            expect(body.user[0].hasOwnProperty("surname")).toBe(true);
            expect(body.user[0].hasOwnProperty("email")).toBe(true);
            expect(body.user[0].hasOwnProperty("phone_number")).toBe(true);
            expect(body.user[0].hasOwnProperty("avatar")).toBe(true);
            expect(body.user[0].hasOwnProperty("created_at")).toBe(true);
        });
    });
    describe("POST /api/properties/:id/reviews Testing", () => {

        const newReview = {
            guest_id: 2,
            rating: 5,
            comment: "Review of property"
        };

        test("responds with status code: 201", async () => {
            await request(app).post("/api/properties/1/reviews").send(newReview).expect(201);
        });
        test("responds with an object that contains {review_id, property_id, guest_id, rating, comment, created_at}", async () => {
            const {body} = await request(app).post("/api/properties/1/reviews").send(newReview);
            
            expect(Object.keys(body).length).toBe(6);

            expect(body.review_id).toBe(12);
            expect(body.property_id).toBe(1);
            expect(body.guest_id).toBe(newReview.guest_id);
            expect(body.rating).toBe(newReview.rating);
            expect(body.comment).toBe(newReview.comment);
            expect(body.hasOwnProperty("created_at")).toBe(true);
        });
    });
});