const { app } = require('../../config');
const { querySkip, generateUniqueId } = require('../../utils');
const { NotFoundError } = require('../../utils/errors');
const URL = require('./url.model');

const urlService = {
  createShortUrl: async ({ originalUrl, user, expiryDate }) => {
    const url = {
      originalUrl,
      user,
      shortCode: generateUniqueId(7),
    };

    if (expiryDate) {
      url.expireAt = new Date(expiryDate);
    }
    const { _id, shortCode } = await URL.create(url);

    return { _id, shortUrl: `${app.url}/${shortCode}`, originalUrl, expiryDate };
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
