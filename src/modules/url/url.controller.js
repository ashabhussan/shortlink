const urlService = require('./url.service');
const urlValidator = require('./url.validator');

module.exports = {
  createShortUrl: async (req, res, next) => {
    try {
      const input = req.body;
      input.user = req.userInfo?.userId;
      const value = urlValidator.validateUrlCreation(input);

      const shortUrl = await urlService.createShortUrl(value);

      return res.json({
        data: shortUrl,
      });
    } catch (err) {
      next(err);
    }
  },

  redirectShortUrl: async (req, res, next) => {
    try {
      const url = await urlService.getUrlByShortCode(req.params.shortCode);

      res.redirect(`${url.originalUrl}`);
    } catch (err) {
      next(err);
    }
  },

  getUrls: async (req, res, next) => {
    try {
      const input = {};
      input.user = req.userInfo?.userId;
      input.page = req.query.page;
      input.perPage = req.query.perPage;

      const value = urlValidator.validateUrlGet(input);

      const urls = await urlService.getUrlsByUser(value);

      return res.json({ data: urls });
    } catch (err) {
      next(err);
    }
  },

  deleteUrl: async (req, res, next) => {
    try {
      const input = {};
      input.user = req.userInfo?.userId;
      input.urlId = req.params.urlId;

      const value = urlValidator.validateUrlDelete(input);

      const removedUrl = await urlService.deleteUrl(value);

      return res.json({ data: removedUrl });
    } catch (err) {
      next(err);
    }
  },
};
