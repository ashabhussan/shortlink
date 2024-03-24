module.exports = {
  app: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpirationTime: process.env.JWT_TOKEN_EXPIRATION_TIME,
  },
  db: {
    uri: process.env.MONGO_URI,
  },
  isDevEnvironment: process.env.NODE_ENV === 'development',
};
