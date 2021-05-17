const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Generate token',

  description: 'Generate a new JWT token using a user ID as reference',

  inputs: {
    userId: {
      description: 'The token owner\'s user ID',
      type: 'number',
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'JWT token',
      outputDescription: 'A JWT token containing the authenticated user ID valid for 12 hours.',
    },
  },

  fn: async function (inputs, exits) {
    const tokenUser = { 'user_id': inputs.userId };
    const tokenExpiry = { expiresIn: '12h' };

    const token = jwt.sign(
      tokenUser,
      sails.config.custom.jwtSecretKey,
      tokenExpiry
    );

    exits.success(token);
  },
};
