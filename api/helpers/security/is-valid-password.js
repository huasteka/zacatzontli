const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Validate password',

  description: 'Verify if the informed plain text password matches the encrypted one.',

  inputs: {
    password: {
      description: 'A plain text password',
      type: 'string',
      required: true,
    },

    hashedPassword: {
      description: 'A bcrypt hashed password',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'It matches',
      outputDescription: 'The plain text password matches the encrypted one.',
    },
  },

  fn: async function (inputs, exits) {
    const match = await bcrypt.compare(inputs.password, inputs.hashedPassword);

    if (!match) {
      return exits.success(false);
    }

    return exits.success(true);
  },
};
