const { UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../utils/errors');
const logger = require('../../utils/logger');
const { urlCreationValidator } = require('./url.validator');
const { createShortUrl, getUrlByShortCode } = require('./url.service');
const { app } = require('../../config/config');
const generateUniqueId = require('../../utils/uuid');

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
};
