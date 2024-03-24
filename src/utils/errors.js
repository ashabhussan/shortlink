const errors = {
  BAD_REQUEST: {
    code: 400,
    message: 'Bad Request',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Unauthorized',
  },
  FORBIDDEN: {
    code: 403,
    message: 'Forbidden',
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: 'Unprocessable Entity',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error',
  },
};

module.exports = errors;
