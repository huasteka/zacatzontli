/**
 * @apiDefine ErrorHandler
 * @apiError {Object[]} errors
 * @apiError {Number} errors.status
 * @apiError {String} errors.code
 * @apiError {String} errors.message
 */
module.exports = {
  friendlyName: 'Format error',

  description: 'Creates a standardized error message for error reporting',

  inputs: {
    status: {
      description: 'HTTP status this error should have',
      type: 'number',
      required: true,
    },

    code: {
      description: 'The error code that produced this error',
      type: 'string',
      required: true,
    },

    message: {
      description: 'The content that will be displayed in this error',
      type: 'string',
      required: true,
    },
  },

  fn: async function ({ status, code, message }, exits) {
    exits.success({ status, code, message });
  },
};
