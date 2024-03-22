module.exports = {
  app: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
  },
  isDevEnvironment: process.env.NODE_ENV === 'development',
};
