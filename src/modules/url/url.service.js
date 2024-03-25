const URL = require('./url.model');

module.exports = {
  createShortUrl: async (args) => {
    return URL.create(args);
  },

  getUrlByShortCode: async (shortCode) => {
    return URL.findOne({ shortCode });
  },
};
