const { db } = require('../src/config');
const { connectDB, dropDB, closeDB } = require('../src/db');

const dbURL = `${db.uri}-test`;

beforeAll(async () => {
  connectDB(dbURL);
});

afterAll(async () => {
  await dropDB();
  await closeDB();
});
