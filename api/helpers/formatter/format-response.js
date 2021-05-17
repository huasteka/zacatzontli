module.exports = {
  friendlyName: 'Format response',

  description: 'Create a standardized formatted message when responding to any request',

  inputs: {
    type: {
      description: 'The type of this response',
      type: 'string',
      required: true,
    },

    payload: {
      description: 'JSON object that represents the response content',
      type: 'json',
      required: true,
    },

    errors: {
      description: 'The errors that occured during the request',
      type: 'ref',
      required: false,
    },
  },

  fn: async function ({ type, payload, errors }, exits) {
    const { id, ...attributes } = payload;
    exits.success({
      data: {
        type,
        id,
        attributes,
      },
      errors,
    });
  },
};
