const {
    createRef,
    createUsersRef,
    formatDataWithRef,
    formatPropertiesData,
    formatPropertyTypesData,
    formatReviewsData,
    formatUsersData,
    formatFavouritesData
} = require("../db/utils.js");

describe("Utility Function Testing", () => {
    describe("createRef() Testing", () => {
        test("Returns an object when passed an array", () => {
            expect(typeof createRef([])).toBe("object");
        });
        test("Returns the values from prop1 as keys in the new object. (Note: Keys will be strings)", () => {
            expect(Object.keys(createRef([{a: 1, b: 2}, {a: 3, b: 4}], "a", "b"))).toEqual(["1", "3"]);
        });
        test("Returns the values from prop2 as values in the new object. (Note: Values do not have to be string)", () => {
            expect(Object.values(createRef([{a: 1, b: 2}, {a: 3, b: 4}], "a", "b"))).toEqual([2, 4]);
        });
        test("Returns the values from prop1 and prop2 as key-value pairs", () => {
            const testData = [
                {number: 1, name: "alpha"},
                {number: 2, name: "bravo"},
                {number: 3, name: "charlie"}
            ];
            const expectedOutput = {1: "alpha", 2: "bravo", 3: "charlie"};
            expect(createRef(testData, "number", "name")).toEqual(expectedOutput);
        })
    });
    describe("createUsersRef() Testing", () => {
        test("Returns an object when passed an array", () => {
            expect(typeof createUsersRef([])).toBe("object");
        });
        test("Returns the concatenated first_name and surname as a key of the new object", () => {
            expect(Object.keys(createUsersRef([{user_id: "101", first_name:"Michael", surname:"Bracken"}]))).toEqual(["Michael Bracken"]);
        });
        test("Returns the user_id as a value of the new object", () => {
            expect(Object.values(createUsersRef([{user_id: "101", first_name:"Michael", surname:"Bracken"}]))).toEqual(["101"]);
        });
        test("Returns the concatenated name and user_id as key-value pairs", () => {
            const testData = [
                {user_id: "101", first_name:"Michael", surname:"Bracken"},
                {user_id: "007", first_name:"James", surname:"Bond"}
            ];

            const expectedOutput = {"Michael Bracken": "101", "James Bond": "007"};

            expect(createUsersRef(testData)).toEqual(expectedOutput);
        });
    });
    describe("formatDataWithRef() Testing", () => {

        const testData = [
            {name: "Alex", age: 11},
            {name: "Barry", age: 22},
            {name: "Chris", age: 33}
        ];

        const testRef = {
            "Alex": "001",
            "Barry": "002",
            "Chris": "003"
        };

        const formattedData = formatDataWithRef(testData, testRef, "name", "number");

        test("Returns a nested Array when passed an Object Array", () => {
            expect(Array.isArray(formattedData)).toBe(true);
            expect(typeof formattedData[0]).toBe("object");
        });
        test("Replaces keyToRemove with keyToAdd for each inner object", () => {
            formattedData.forEach(obj => {
                expect(Object.keys(obj).includes("name")).toBe(false);
                expect(Object.keys(obj).includes("number")).toBe(true);
            });
        });

    });
     describe("formatPropertyTypesData() Testing", () => {
        test("Returns an array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatPropertyTypesData(arrOfObj))).toBe(true)
        });
        test("Returns a nested array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatPropertyTypesData(arrOfObj)[0])).toBe(true)
        });
        test("Returns the value of property_type as the first value in the inner array", () => {
            const propertyTypesTestData = [{property_type: "house"}]
            expect(formatPropertyTypesData(propertyTypesTestData)[0][0]).toBe("house")
        });
        test("Returns the value of description as the second value in the inner array", () => {
            const propertyTypesTestData = [{description: "it's a house"}]
            expect(formatPropertyTypesData(propertyTypesTestData)[0][1]).toBe("it's a house")
        });
        test("Returns all of the values as the inner array", () => {
            const propertyTypesTestData = [
                {property_type: "house", description: "it's a house"}]
            const expectedOutput = [
                ["house", "it's a house"]]
            
            expect(formatPropertyTypesData(propertyTypesTestData)).toEqual(expectedOutput)
        });
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
        });
    });
    describe("formatUsersData() Testing", () => {
        test("Returns an array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatUsersData(arrOfObj))).toBe(true)
        });
        test("Returns a nested array when passed an Array of Object(s)", () => {
            const arrOfObj = [{}]
            expect(Array.isArray(formatUsersData(arrOfObj)[0])).toBe(true)
        });
        test("Returns the value of first_name as the first value in the inner array", () => {
            const usersTestData = [{first_name: "Michael"}]
            expect(formatUsersData(usersTestData)[0][0]).toBe("Michael")
        });
        test("Returns the value of surname as the second value in the inner array", () => {
            const usersTestData = [{surname: "Bracken"}]
            expect(formatUsersData(usersTestData)[0][1]).toBe("Bracken")
        });
        test("Returns the value of email as the third value in the inner array", () => {
            const usersTestData = [{email: "michael@email.com"}]
            expect(formatUsersData(usersTestData)[0][2]).toBe("michael@email.com")
        });
        test("Returns the value of phone_number as the fourth value in the inner array", () => {
            const usersTestData = [{phone_number: "+44 7000 111111"}]
            expect(formatUsersData(usersTestData)[0][3]).toBe("+44 7000 111111")
        });
        test("Returns the value of role as TRUE in the fifth value in the inner array if the passed value of role is 'host'", () => {
            const usersTestData = [{role: "host"}]
            expect(formatUsersData(usersTestData)[0][4]).toBe("true")
        });
        test("Returns the value of role as FALSE in the fifth value in the inner array, if the passed value of role is not 'host'", () => {
            const usersTestData = [{role: "guest"}]
            expect(formatUsersData(usersTestData)[0][4]).toBe("false")
        });
        test("Returns the value of avatar as the sixth value in the inner array", () => {
            const usersTestData = [{avatar: "avatar.com/michael"}]
            expect(formatUsersData(usersTestData)[0][5]).toBe("avatar.com/michael")
        });
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
        });
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
        });
    });
    describe("formatPropertiesData() Testing", () => {
        
    });
    describe("formatReviewsData() Testing", () => {
        
    });
    describe("formatFavouritesData() Testing", () => {
        test("Returns a nested Array when passed an Obect Array", () => {
            expect(Array.isArray(formatFavouritesData([{}]))).toBe(true);
            expect(typeof formatFavouritesData([{}])[0]).toBe("object");
        });

        const testData =[
            {guest_id: 1, property_id: 10},
            {guest_id: 2, property_id: 9},
            {guest_id: 3, property_id: 8}
        ];
        
        const formattedData = formatFavouritesData(testData);

        test("Returns each guest_id as the first element of each inner array", () => {
            expect(formattedData[0][0]).toBe(1);
            expect(formattedData[1][0]).toBe(2);
            expect(formattedData[2][0]).toBe(3);
        });
        test("Returns each property_id as the first element of each inner array", () => {
            expect(formattedData[0][1]).toBe(10);
            expect(formattedData[1][1]).toBe(9);
            expect(formattedData[2][1]).toBe(8);
        });
        test("Returns each pairs of guest_id and property_id as elements within the same inner array", () => {
            expect(formattedData[0]).toEqual([1, 10]);
            expect(formattedData[1]).toEqual([2, 9]);
            expect(formattedData[2]).toEqual([3, 8]);
        });
    });

});