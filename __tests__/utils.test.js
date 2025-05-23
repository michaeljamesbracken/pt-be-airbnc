const {formatPropertiesData,
    formatPropertyTypesData,
    formatReviewsData,
    formatUsersData} = require("../db/utils.js") 

describe("Utility Functions Testing", () => {
    describe("formatPropertyTypesData() testing", () => {
        test("Returns an array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatPropertyTypesData(arrOfObj))).toBe(true)
        })
        test("Returns a nested array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatPropertyTypesData(arrOfObj)[0])).toBe(true)
        })
        test("Returns the value of property_type as the first value in the inner array", () => {
            const propertyTypesTestData = [{property_type: "house"}]
            expect(formatPropertyTypesData(propertyTypesTestData)[0][0]).toBe("house")
        })
        test("Returns the value of description as the second value in the inner array", () => {
            const propertyTypesTestData = [{description: "it's a house"}]
            expect(formatPropertyTypesData(propertyTypesTestData)[0][1]).toBe("it's a house")
        })
        test("Returns all of the values as the inner array", () => {
            const propertyTypesTestData = [
                {property_type: "house", description: "it's a house"}]
            const expectedOutput = [
                ["house", "it's a house"]]
            
            expect(formatPropertyTypesData(propertyTypesTestData)).toEqual(expectedOutput)
        })
        test("Returns multiple arrays when passed multiple objects", () => {
            const propertyTypesTestData = [
                {property_type: "house", description: "it's a house"}, 
                {property_type: "mansion", description: "it's a big house"},
                {property_type: "bungalow", description: "it's a short house"}]
            const expectedOutput = [
                ["house", "it's a house"],
                ["mansion", "it's a big house"],
                ["bungalow", "it's a short house"]]
            
            expect(formatPropertyTypesData(propertyTypesTestData)).toEqual(expectedOutput)
        })
    })
    describe("formatUsersData() testing", () => {
        test("Returns an array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatUsersData(arrOfObj))).toBe(true)
        })
        test("Returns a nested array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatUsersData(arrOfObj)[0])).toBe(true)
        })
        test("Returns the value of first_name as the first value in the inner array", () => {
            const usersTestData = [{first_name: "Michael"}]
            expect(formatUsersData(usersTestData)[0][0]).toBe("Michael")
        })
        test("Returns the value of surname as the second value in the inner array", () => {
            const usersTestData = [{surname: "Bracken"}]
            expect(formatUsersData(usersTestData)[0][1]).toBe("Bracken")
        })
        test("Returns the value of email as the third value in the inner array", () => {
            const usersTestData = [{email: "michael@email.com"}]
            expect(formatUsersData(usersTestData)[0][2]).toBe("michael@email.com")
        })
        test("Returns the value of phone_number as the fourth value in the inner array", () => {
            const usersTestData = [{phone_number: "+44 7000 111111"}]
            expect(formatUsersData(usersTestData)[0][3]).toBe("+44 7000 111111")
        })
        test("Returns the value of role as TRUE in the fifth value in the inner array if the passed value of role is 'host'", () => {
            const usersTestData = [{role: "host"}]
            expect(formatUsersData(usersTestData)[0][4]).toBe("true")
        })
        test("Returns the value of role as FALSE in the fifth value in the inner array, if the passed value of role is not 'host'", () => {
            const usersTestData = [{role: "guest"}]
            expect(formatUsersData(usersTestData)[0][4]).toBe("false")
        })
        test("Returns the value of avatar as the sixth value in the inner array", () => {
            const usersTestData = [{avatar: "avatar.com/michael"}]
            expect(formatUsersData(usersTestData)[0][5]).toBe("avatar.com/michael")
        })
        test("Returns all of the values as part of the inner array", () => {
            const usersTestData = [
                {first_name: "Michael", surname: "Bracken",
                email: "michael@email.com", phone_number: "+44 7000 111111",
                role: "host", avatar: "avatar.com/michael"}]
            
            const expectedOutput = [
                ["Michael", "Bracken",
                "michael@email.com", "+44 7000 111111",
                "true", "avatar.com/michael"]]
                
            expect(formatUsersData(usersTestData)).toEqual(expectedOutput)
        })
        test("Returns multiple arrays when passed multiple objects", () => {
            const usersTestData = [
                {first_name: "Michael", surname: "Bracken",
                email: "michael@email.com", phone_number: "+44 7000 111111",
                role: "host", avatar: "avatar.com/michael"},
                {first_name: "Jimmy", surname: "Jones",
                email: "jimmy@email.com", phone_number: "+44 7000 222222",
                role: "guest", avatar: "avatar.com/jimmy"}]
            
            const expectedOutput = [
                ["Michael", "Bracken",
                "michael@email.com", "+44 7000 111111",
                "true", "avatar.com/michael"],
                ["Jimmy", "Jones",
                "jimmy@email.com", "+44 7000 222222",
                "false", "avatar.com/jimmy"]]
                

            expect(formatUsersData(usersTestData)).toEqual(expectedOutput)
        })
    })
    describe("formatPropertiesData() testing", () => {

        test("Returns an array when passed arguements", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatPropertiesData(arrOfObj, arrOfObj))).toBe(true)
        })
        test("Returns a nested array when passed arguements", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatPropertiesData(arrOfObj, arrOfObj)[0])).toBe(true)
        })

        const testPropertyData = [{"name": "Modern Apartment in City Center",
            "property_type": "Apartment",
            "location": "London, UK",
            "price_per_night": 120.0,
            "description": "Description of Modern Apartment in City Center.",
            "host_name": "Alice Johnson",
            "amenities": ["WiFi", "TV", "Kitchen"]}]
        
        const testUsersData = [{
            "first_name": "Bob",
            "surname": "Smith",
            "email": "bob@example.com",
            "phone_number": "+44 7000 222222",
            "role": "guest",
            "avatar": "https://example.com/images/bob.jpg"},
            {"first_name": "Alice",
            "surname": "Johnson",
            "email": "alice@example.com",
            "phone_number": "+44 7000 111111",
            "role": "host",
            "avatar": "https://example.com/images/alice.jpg"}]

        test("Returns the user_id of the host_name as the first value of the inner array", () => {
            expect(formatPropertiesData(testPropertyData, testUsersData)[0][0]).toBe(2)
        })
        test("Returns name as the second value of the inner array", () => {
            expect(formatPropertiesData(testPropertyData, testUsersData)[0][1]).toBe("Modern Apartment in City Center")
        })
        test("Returns location as the third value of the inner array", () => {
            expect(formatPropertiesData(testPropertyData, testUsersData)[0][2]).toBe("London, UK")
        })
        test("Returns property_type as the fourth value of the inner array", () => {
            expect(formatPropertiesData(testPropertyData, testUsersData)[0][3]).toBe("Apartment")
        })
        test("Returns price_per_night as the fifth value of the inner array", () => {
            expect(formatPropertiesData(testPropertyData, testUsersData)[0][4]).toBe(120.0)
        })
        test("Returns description as the sixth value of the inner array", () => {
            expect(formatPropertiesData(testPropertyData, testUsersData)[0][5]).toBe("Description of Modern Apartment in City Center.")
        })
        test("Returns all of the values as the inner array", () => {
            const expectedOutput = [[
                2,
                "Modern Apartment in City Center",
                "London, UK",
                "Apartment",
                120.0,
                "Description of Modern Apartment in City Center."]]
            
                expect(formatPropertiesData(testPropertyData, testUsersData)).toEqual(expectedOutput)
        })
        test("Returns multiple arrays when passed multiple objects", () => {
            const testPropertyData = [{"name": "Modern Apartment in City Center",
                "property_type": "Apartment",
                "location": "London, UK",
                "price_per_night": 120.0,
                "description": "Description of Modern Apartment in City Center.",
                "host_name": "Alice Johnson",
                "amenities": ["WiFi", "TV", "Kitchen"]},
                {"name": "Cosy Family House",
                "property_type": "House",
                "location": "Manchester, UK",
                "price_per_night": 150.0,
                "description": "Description of Cosy Family House.",
                "host_name": "Bob Smith",
                "amenities": ["WiFi", "Parking", "Kitchen"]}]

            const expectedOutput = [[
                1,
                "Modern Apartment in City Center",
                "London, UK",
                "Apartment",
                120.0,
                "Description of Modern Apartment in City Center."],
                [1, 
                "Cosy Family House",
                "Manchester, UK",
                "House",
                150.0,
                "Description of Cosy Family House."
                ]]
        })
    })
    describe("formatReviewsData() testing", () => {
        const testReviewsData = [{
            "guest_name": "Alice Johnson",
            "property_name": "Chic Studio Near the Beach",
            "rating": 4,
            "comment": "Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway."
          },
          {
            "guest_name": "Bob Smith",
            "property_name": "Modern Apartment in City Center",
            "rating": 2,
            "comment": "Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Wouldn’t stay again."
          },
          {
            "guest_name": "Emma Davis",
            "property_name": "Luxury Penthouse with View",
            "rating": 5,
            "comment": "Comment about Luxury Penthouse with View: Incredible property! The view from the penthouse is stunning."
          }]

        const testUsersData = [{
        "first_name": "Alice",
        "surname": "Johnson",
        "email": "alice@example.com",
        "phone_number": "+44 7000 111111",
        "role": "host",
        "avatar": "https://example.com/images/alice.jpg"
        },
        {
        "first_name": "Bob",
        "surname": "Smith",
        "email": "bob@example.com",
        "phone_number": "+44 7000 222222",
        "role": "guest",
        "avatar": "https://example.com/images/bob.jpg"
        },
        {
        "first_name": "Emma",
        "surname": "Davis",
        "email": "emma@example.com",
        "phone_number": "+44 7000 333333",
        "role": "host",
        "avatar": "https://example.com/images/emma.jpg"
        }]

        const testPropertiesData = [{
        "name": "Modern Apartment in City Center",
        "property_type": "Apartment",
        "location": "London, UK",
        "price_per_night": 120.0,
        "description": "Description of Modern Apartment in City Center.",
        "host_name": "Emma Davis",
        "amenities": ["WiFi", "TV", "Kitchen"]
        },
        {
        "name": "Luxury Penthouse with View",
        "property_type": "Apartment",
        "location": "London, UK",
        "price_per_night": 250.0,
        "description": "Description of Luxury Penthouse with View.",
        "host_name": "Alice Johnson",
        "amenities": ["WiFi", "Parking", "TV"]
        },
        {
        "name": "Chic Studio Near the Beach",
        "property_type": "Studio",
        "location": "Brighton, UK",
        "price_per_night": 90.0,
        "description": "Description of Chic Studio Near the Beach.",
        "host_name": "Bob Smith",
        "amenities": ["WiFi"]
        }]

        test("Returns an array when passed arguements", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatReviewsData(arrOfObj, arrOfObj, arrOfObj))).toBe(true)
        })
        test("Returns a nested array when passed arguements", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatReviewsData(arrOfObj, arrOfObj, arrOfObj)[0])).toBe(true)
        })
        test("Returns the property_id as the first value of the inner array", () => {
            expect(formatReviewsData(testReviewsData, testPropertiesData, testUsersData)[0][0]).toBe(3)
        })
        test("Returns the guest_id as the second value of the inner array", () => {
            expect(formatReviewsData(testReviewsData, testPropertiesData, testUsersData)[0][1]).toBe(1)
        })
        test("Returns the rating as the third value of the inner array", () => {
            expect(formatReviewsData(testReviewsData, testPropertiesData, testUsersData)[0][2]).toBe(4)
        })
        test("Returns the comment as the fourth value of the inner array", () => {
            expect(formatReviewsData(testReviewsData, testPropertiesData, testUsersData)[0][3]).toBe("Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway.")
        })
        test("Returns all of the values as one inner array", () => {
            const expectedOutput = [3,
                1,
                4,
                "Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway."
            ]
            expect(formatReviewsData(testReviewsData, testPropertiesData, testUsersData)[0]).toEqual(expectedOutput)
        })
        test("Returns multiple arrays", () => {
            const expectedOutput = [[
                3,
                1,
                4,
                "Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway."
            ],
            [
                1,
                2,
                2,   
                "Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Wouldn’t stay again."
            ],
            [
                2,
                3,
                5,
                "Comment about Luxury Penthouse with View: Incredible property! The view from the penthouse is stunning."
            ]]
            expect(formatReviewsData(testReviewsData, testPropertiesData, testUsersData)).toEqual(expectedOutput)
        })
    })
})