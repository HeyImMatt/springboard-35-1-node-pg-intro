// connect to right DB --- set before loading db.js
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testCompany;

beforeEach(async function() {
  let result = await db.query(`
    INSERT INTO
      companies (code, name, description) VALUES ('testco', 'Test Company', 'Company made for testing things.')
      RETURNING code, name, description`);
  testCompany = result.rows[0];
});

afterEach(async function() {
  await db.query("DELETE FROM companies");
});

afterAll(async function() {
  await db.end();
});

describe("GET /companies", function() {
  test("Gets companies", async function() {
    const response = await request(app).get(`/companies`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      companies: [{
        code: testCompany.code,
        name: testCompany.name,
      }]
    });
  });
});