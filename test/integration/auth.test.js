const { deleteUsers, userPayload, sendRequest } = require('../utils');

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

      const userResponse = response.body.data;

      expect(response.statusCode).toBe(200);
      expect(userResponse.name).toEqual(user.name);
      expect(userResponse.email).toEqual(user.email);
      expect(typeof userResponse.token).toBe('string');
    });
  });
});
