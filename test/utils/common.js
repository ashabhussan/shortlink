const jwt = require('jsonwebtoken');
const {
  app: { jwtSecret },
} = require('../../src/config');

module.exports = {
  generateJwtToken: async (payload) => {
    const { _id, email } = payload;
    const jwtPayload = { userId: _id, email };

    const jwtToken = jwt.sign(jwtPayload, jwtSecret, {
      expiresIn: '5m',
    });

    return `Bearer ${jwtToken}`;
  },
};
