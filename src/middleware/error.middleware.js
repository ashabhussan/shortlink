const { ValidationError } = require('joi');
const { formatJoiErrorMessages, logger } = require('../utils');
const { NotFoundError, UnauthorizedError, errors, BadRequestError } = require('../utils/errors');
module.exports = (err, req, res, next) => {
  const response = { code: null, message: err.message };
  let status = null;

  switch (true) {
    case err instanceof ValidationError:
      status = errors.UNPROCESSABLE_ENTITY.code;
      response.code = errors.UNPROCESSABLE_ENTITY.code;
      response.message = errors.UNPROCESSABLE_ENTITY.message;
      response.value = formatJoiErrorMessages(err);
      break;

    case err instanceof NotFoundError:
      status = errors.NOT_FOUND.code;
      response.code = errors.NOT_FOUND.code;
      break;

    case err instanceof UnauthorizedError:
      status = errors.UNAUTHORIZED.code;
      response.code = errors.UNAUTHORIZED.code;
      break;

    case err instanceof BadRequestError:
      status = errors.BAD_REQUEST.code;
      response.code = errors.BAD_REQUEST.code;
      break;

    default:
      logger.error(err);
      status = errors.INTERNAL_SERVER_ERROR.code;
      response.code = errors.INTERNAL_SERVER_ERROR.code;
      response.message = errors.INTERNAL_SERVER_ERROR.message;
      break;
  }

  res.status(status).json(response);
};
