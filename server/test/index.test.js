const request = require('supertest')
let app = require('../app')

describe('Test the root path', () => {
  test('should respond with a 200 with no query parameters', () => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
  });
})