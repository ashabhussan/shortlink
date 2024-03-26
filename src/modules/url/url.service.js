const { querySkip } = require('../../utils');
const URL = require('./url.model');

module.exports = {
  createShortUrl: async (args) => {
    return URL.create(args);
  },

  getUrlByShortCode: async (shortCode) => {
    return URL.findOne({ shortCode });
  },

  getUrlsByUser: async ({ user, page, perPage }) => {
    const skip = querySkip(page, perPage);
    const query = { user };

    return URL.find(query).skip(skip).limit(perPage);
  },

  deleteUrl: async ({ user, urlId }) => {
    return URL.findOneAndDelete({ user, _id: urlId });
  },
};
