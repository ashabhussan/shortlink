const supertest = require('supertest');
const app = require('../../src/server');

module.exports = async ({ method, endpoint, token, body }) => {
  let request = supertest(app);

  if (token) request.set = { authorization: token };

  switch (method) {
    case 'GET':
      request = request.get(endpoint);
      break;

    case 'POST':
      request = request.post(endpoint).send(body);
      break;

    default:
      throw new Error('Unsupported HTTP method!');
  }

  return request;
};
