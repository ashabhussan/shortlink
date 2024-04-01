const { UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../utils/errors');
const { urlCreationValidator, urlGetValidator, urlDeleteValidator } = require('./url.validator');
const { createShortUrl, getUrlByShortCode, getUrlsByUser, deleteUrl } = require('./url.service');
const { app } = require('../../config');
const { logger, generateUniqueId } = require('../../utils');

module.exports = {
  createShortUrl: async (req, res) => {
    try {
      const input = req.body;
      input.user = req.userInfo?.userId;

      const { error, value } = urlCreationValidator.validate(input);
      if (error) {
        return res.status(UNPROCESSABLE_ENTITY.code).json({
          message: UNPROCESSABLE_ENTITY.message,
          value: error.details,
        });
      }

      value.shortCode = generateUniqueId(7);

      const { _id, shortCode, originalUrl } = await createShortUrl(value);

      return res.json({
        data: { _id, shortUrl: `${app.url}/${shortCode}`, originalUrl },
      });
    } catch (err) {
      logger.error(err);
      return res.status(INTERNAL_SERVER_ERROR.code).json({
        message: INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  redirectShortUrl: async (req, res) => {
    try {
      const url = await getUrlByShortCode(req.params.shortCode);
      if (!url) return res.status(NOT_FOUND.code).json({ message: NOT_FOUND.message });

      res.redirect(`${url.originalUrl}`);
    } catch (err) {
      logger.error(err);
      return res.status(INTERNAL_SERVER_ERROR.code).json({
        message: INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  getUrls: async (req, res) => {
    try {
      const input = {};
      input.user = req.userInfo?.userId;
      input.page = req.query.page;
      input.perPage = req.query.perPage;

      const { error, value } = urlGetValidator.validate(input);
      if (error) {
        return res.status(UNPROCESSABLE_ENTITY.code).json({
          message: UNPROCESSABLE_ENTITY.message,
          value: error.details,
        });
      }

      const urls = await getUrlsByUser(value);

      return res.json({ data: urls });
    } catch (err) {
      logger.error(err);
      return res.status(INTERNAL_SERVER_ERROR.code).json({
        message: INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  deleteUrl: async (req, res) => {
    try {
      const input = {};
      input.user = req.userInfo?.userId;
      input.urlId = req.params.urlId;

      const { error, value } = urlDeleteValidator.validate(input);
      if (error) {
        return res.status(UNPROCESSABLE_ENTITY.code).json({
          message: UNPROCESSABLE_ENTITY.message,
          value: error.details,
        });
      }

      const removedUrl = await deleteUrl(value);

      return res.json({ data: removedUrl });
    } catch (err) {
      logger.error(err);
      return res.status(INTERNAL_SERVER_ERROR.code).json({
        message: INTERNAL_SERVER_ERROR.message,
      });
    }
  },
};
