const { faker } = require('@faker-js/faker');
const {
  deleteUsers,
  sendRequest,
  createUser,
  deleteUrls,
  generateJwtToken,
  createUrls,
} = require('../utils');

describe('URL Test Suit', () => {
  beforeEach(async () => {
    await Promise.all([deleteUsers(), deleteUrls()]);
  });

  afterEach(async () => {
    await Promise.all([deleteUsers(), deleteUrls()]);
  });

  describe('POST /urls', () => {
    test('should create a new short urls', async () => {
      const user = await createUser();
      const token = await generateJwtToken(user);
      const requestBody = { user: user._id, originalUrl: faker.internet.url() };

      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/urls',
        body: requestBody,
        token,
      });

      const responseBody = response.body.data;

      expect(response.statusCode).toBe(200);
      expect(typeof responseBody._id).toBe('string');
      expect(responseBody.originalUrl).toEqual(requestBody.originalUrl);
      expect(typeof responseBody.shortUrl).toBe('string');
    });

    test('should not create a new short url with invalid input', async () => {
      const user = await createUser();
      const token = await generateJwtToken(user);
      const requestBody = { user: user._id, originalUrl: faker.lorem.words(5) };

      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/urls',
        body: requestBody,
        token,
      });

      expect(response.statusCode).toBe(422);
    });

    test('should not create a new short url without auth token', async () => {
      const user = await createUser();
      const requestBody = { user: user._id, originalUrl: faker.internet.url() };

      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/urls',
        body: requestBody,
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /urls', () => {
    test('should return urls by user with pagination', async () => {
      const user = await createUser();
      const token = await generateJwtToken(user);
      await createUrls(user._id, 15);

      const page = 1;
      const perPage = 10;

      const response = await sendRequest({
        method: 'GET',
        endpoint: `/api/urls?page=${page}&perPage=${perPage}`,
        token,
      });

      const responseBody = response.body.data;

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody).toHaveLength(perPage);
    });

    test('should not return urls by user with invalid input', async () => {
      const user = await createUser();
      const token = await generateJwtToken(user);
      await createUrls(user._id, 52);

      const page = 1;
      const perPage = 51;

      const response = await sendRequest({
        method: 'GET',
        endpoint: `/api/urls?page=${page}&perPage=${perPage}`,
        token,
      });

      expect(response.statusCode).toBe(422);
    });

    test('should not return urls by user without auth token', async () => {
      const user = await createUser();
      await createUrls(user._id);

      const response = await sendRequest({
        method: 'GET',
        endpoint: '/api/urls',
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /urls/:urlId', () => {
    test('should delete an existing url by urlId', async () => {
      const user = await createUser();
      const token = await generateJwtToken(user);
      const urls = await createUrls(user._id, 1);
      const url = urls[0];

      const response = await sendRequest({
        method: 'DELETE',
        endpoint: `/api/urls/${url._id}`,
        token,
      });

      const responseBody = response.body.data;

      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(url._id.toString());
      expect(responseBody.originalUrl).toEqual(url.originalUrl);
      expect(responseBody.shortCode).toEqual(url.shortCode);
    });

    test('should not delete an existing url without auth token', async () => {
      const user = await createUser();
      const urls = await createUrls(user._id, 1);
      const url = urls[0];

      const response = await sendRequest({
        method: 'DELETE',
        endpoint: `/api/urls/${url._id}`,
      });

      expect(response.statusCode).toBe(401);
    });

    test('should not delete an existing url with invalid urlId', async () => {
      const user = await createUser();
      const token = await generateJwtToken(user);
      const url = { _id: faker.string.uuid() };

      const response = await sendRequest({
        method: 'DELETE',
        endpoint: `/api/urls/${url._id}`,
        token,
      });

      expect(response.statusCode).toBe(422);
    });
  });
});
