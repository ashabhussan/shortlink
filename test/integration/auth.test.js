const { deleteUsers, userPayload, sendRequest, createUser } = require('../utils');

describe('Auth Test Suit', () => {
  beforeEach(async () => {
    await deleteUsers();
  });

  afterEach(async () => {
    await deleteUsers();
  });

  describe('POST /users/create', () => {
    test('should create a new user', async () => {
      const user = userPayload();

      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/users/create',
        body: user,
      });

      const responseBody = response.body.data;

      expect(response.statusCode).toBe(200);
      expect(typeof responseBody._id).toBe('string');
      expect(responseBody.name).toEqual(user.name);
      expect(responseBody.email).toEqual(user.email);
      expect(typeof responseBody.token).toBe('string');
    });

    test('should not create a new user with invalid input', async () => {
      const user = userPayload({ email: 'test@test[dot]com' });

      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/users/create',
        body: user,
      });

      expect(response.statusCode).toBe(422);
    });
  });

  describe('POST /users/login', () => {
    test('should login an existing user', async () => {
      const user = await createUser();

      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/users/login',
        body: { email: user.email, password: user.password },
      });

      const responseBody = response.body.data;

      expect(response.statusCode).toBe(200);
      expect(typeof responseBody.token).toBe('string');
    });
    test('should not login an existing user with invalid pass', async () => {
      const user = await createUser();

      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/users/login',
        body: { email: user.email, password: 'test' },
      });

      expect(response.statusCode).toBe(401);
    });

    test('should not sent token for unregistered user', async () => {
      const response = await sendRequest({
        method: 'POST',
        endpoint: '/api/users/login',
        body: { email: 'test@email.com', password: 'test' },
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
