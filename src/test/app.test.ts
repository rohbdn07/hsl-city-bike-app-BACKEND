import request from "supertest";
import app from "../app";
import path from "path";
import assert from "assert";
import { DataSource } from "typeorm";

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.HOST;
let server;
let connection;

// check either for dev or prod environment
const isComplied = path.extname(__filename).includes("js");

// runs before each tests
beforeEach(async () => {
    try {
        connection = new DataSource({
            type: "postgres",
            host: "localhost",
            port: process.env.POSTGRESQL_PORT
                ? parseInt(process.env.POSTGRESQL_PORT)
                : 5432,
            username: process.env.APP_DB_USER,
            password: process.env.APP_DB_PASS,
            database: process.env.APP_DB_NAME,
            entities: [`src/database/entity/**/*.${isComplied ? "js" : "ts"}`],
            // migrations: [`src/migration/**/*.${isComplied ? "js" : "ts"}`],
            // logging: true,
            // synchronize: true,
            // dropSchema: true,
        });
        await connection.initialize();
        server = app.listen(port);
    } catch (error) {
        console.log("Error: connecting to api in Test");
    }
});

// runs after each tests is executed
afterEach(() => {
    connection.close();
    server.close();
});

// example of return success data
const dataResponse = {
    success: true,
    message: "successfully got the data from database",
    data: {
        month: "july",
        totalJourney: 2,
        totalJourneyStarting: 2,
        totalJourneyEnding: 0,
        stationId: 501,
        stationName: "Hanasaari",
        address: "Hanaholmsstranden 1",
        kaupunki: "Espoo",
        capacity: 10,
        avgDistanceStarting_KM: 0.96,
        avgDistanceEnding_KM: "null",
    },
};

// Runs Tests for request GET /stationinfo with its params
describe("GET /stationinfo/:id/:monthname", function () {
    it("should responds with status code 200 OK if correct params has passed in", async function () {
        const response = await request(app)
            .get("/api/hslcitybike/stationsinfo/501/july")
            .set("Accept", "application/json");
        expect(response.status).toEqual(200);
    });

    it("should pass if response object keys are matching", async () => {
        const response = await request(app).get(
            "/api/hslcitybike/stationsinfo/501/july"
        );
        expect(Object.keys(response.body)).toEqual(Object.keys(dataResponse));
        expect(response.body).toHaveProperty("success", true);
    });

    it("should Fails if api(route) path is incorrect, 404 Not Found", async () => {
        const response = await request(app).get(
            "/api/hslcitybike/stationsinfos/501/july"
        );
        expect(response.statusCode).toEqual(404);
    });

    it("should response 200 Ok with no data if station id doesn't exists", async () => {
        const response = await request(app).get(
            "/api/hslcitybike/stationsinfo/890/july"
        );
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("success", false);
    });

    it("should return status code 404 Not Found if no month params passed in", async () => {
        const response = await request(app).get(
            "/api/hslcitybike/stationsinfo/501"
        );
        expect(response.statusCode).toEqual(404);
    });

    it("should return status code 404 Not Found if no params(month and station id) passed in", async () => {
        const response = await request(app).get(
            "/api/hslcitybike/stationsinfo"
        );
        expect(response.statusCode).toEqual(404);
    });
});

// Run Tests for request: GET /stationlist and its queries
describe("GET /stationslist", () => {
    it("should responds with status code 200 even when no queries has passed", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/stationslists")
            .set("Accept", "application/json");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty(
            "message",
            "successfully got the data from database"
        );
    });

    it("should Pass if route contains required queries", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/stationslists")
            .query({
                page: 1,
                count: 20,
            })
            .set("Accept", "application/json");

        expect(response.statusCode).toEqual(200);
    });

    it("should pass and response with data if required queries has passed in", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/stationslists")
            .query({
                page: 1,
                count: 20,
                name: "pasila",
            })
            .set("Accept", "application/json");

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty(
            "message",
            "successfully got the data from database"
        );
        expect(response.body.data).toEqual(
            expect.objectContaining({
                totalRows: expect.any(Number),
                counts: expect.any(Number),
                hslData: expect.any(Object),
            })
        );
    });

    it("should responds with status code 404 Not Found if base url(route) is incorrect", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/stationslistsss")
            .set("Accept", "application/json");
        expect(response.statusCode).toEqual(404);
    });
});

// RUNS Tests for request GET /journey/month/:monthname and its queries
describe("GET /jouney/month/:monthname", () => {
    it("should return data with status code 200 if Only month name passed in", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/journeylist/month/july")
            .set("Accept", "application/json");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty(
            "message",
            "successfully got the data from database"
        );
    });

    it("should response with status code 400 Bad Request, if month name is incorrect", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/journeylist/month/august")
            .set("Accept", "application/json");
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body).toHaveProperty(
            "message",
            "Opps! Entered august is not valid input. Please try with correct input."
        );
    });

    it("should response with status code 404 Not Found if No param(month) has passed in", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/journeylist/month")
            .set("Accept", "application/json");
        expect(response.statusCode).toEqual(404);
        expect(response.body).toEqual({});
    });

    it("should return response with data if required queries has passed in", async () => {
        const response = await request(app)
            .get("/api/hslcitybike/journeylist/month/june")
            .query({
                page: 1,
                count: 20,
                search: "Mäntyviita",
            })
            .set("Accept", "application/json");

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty(
            "message",
            "successfully got the data from database"
        );
        expect(response.body.data).toEqual(
            expect.objectContaining({
                monthName: expect.any(String),
                counts: expect.any(Number),
                totalRows: expect.any(Number),
                hslData: expect.any(Array),
            })
        );
    });
});
