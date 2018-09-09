module.exports = {
  formatResponse,
  formatError,
  formatErrors
};

function formatResponse(type, attributes, errors = []) {
  return {
    data: {
      type,
      id: attributes._id,
      attributes
    },
    errors
  };
}

function formatError(status, code, message) {
  return {
    status,
    code,
    message
  };
}

function formatErrors(...errors) {
  return {
    errors: [
      ...errors
    ]
  };
}
