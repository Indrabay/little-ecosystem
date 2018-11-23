const request = require("supertest")
const app = require("../app")

describe("Test api", () => {
  it("Test /ecosystem return json with property data", (done) => {
    request(app)
    .get('/ecosystem')
    .expect((response) => {
      expect(response.body).toHaveProperty('data')
    })
    .expect(200, done)
  })
})
