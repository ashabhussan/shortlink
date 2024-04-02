const errors = {
  BAD_REQUEST: {
    code: 400,
    message: 'Bad Request',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Unauthorized',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Not Found',
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: 'Unprocessable Entity',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error',
  },
  NOT_VALID_ID: {
    code: 422,
    message: 'Invalid ID',
  },
};

class NotFoundError extends Error {
  constructor(message = errors.NOT_FOUND.message) {
    super(message);
  }
}

class UnauthorizedError extends Error {
  constructor(message = errors.UNAUTHORIZED.message) {
    super(message);
  }
}

class BadRequestError extends Error {
  constructor(message = errors.BAD_REQUEST.message) {
    super(message);
  }
}

module.exports = { errors, NotFoundError, UnauthorizedError, BadRequestError };
