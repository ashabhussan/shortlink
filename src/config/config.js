module.exports = {
  app: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpirationTime: process.env.JWT_TOKEN_EXPIRATION_TIME,
    url: process.env.APP_URL,
  },
  db: {
    uri: process.env.MONGO_URI,
  },
  isProdEnvironment: process.env.NODE_ENV === 'production',
  isDevEnvironment: process.env.NODE_ENV === 'development',
  isTestEnvironment: process.env.NODE_ENV === 'test',
};
