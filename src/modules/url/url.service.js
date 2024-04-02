const { app } = require('../../config');
const { querySkip, generateUniqueId } = require('../../utils');
const { NotFoundError } = require('../../utils/errors');
const URL = require('./url.model');

const urlService = {
  createShortUrl: async ({ originalUrl, user }) => {
    const shortCode = generateUniqueId(7);
    const { _id } = await URL.create({ originalUrl, user, shortCode });

    return { _id, shortUrl: `${app.url}/${shortCode}`, originalUrl };
  },

  getUrlByShortCode: async (shortCode) => {
    const url = await URL.findOne({ shortCode });
    if (!url) throw new NotFoundError();
    return url;
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

module.exports = urlService;
