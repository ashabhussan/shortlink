const { faker } = require('@faker-js/faker');
const URL = require('../../src/modules/url/url.model');
const { generateUniqueId } = require('../../src/utils');

module.exports = {
  createUrls: async (userId, count = 10) => {
    const urls = [];
    for (let i = 0; i < count; i++) {
      const url = {
        user: userId,
        originalUrl: faker.internet.url(),
        shortCode: generateUniqueId(7),
      };
      urls.push(url);
    }

    return URL.insertMany(urls);
  },
};
