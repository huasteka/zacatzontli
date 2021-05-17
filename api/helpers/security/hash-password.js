const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash password',

  description: 'Hash a password using bcrypt library.',

  inputs: {
    password: {
      friendlyName: 'Password',
      description: 'A plain text password.',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Hashed password',
      outputDescription: 'A hashed password using bcrypt library with 12 salt rounds.',
    },
  },

  fn: async function (inputs, exits) {
    const hashedPassword = await bcrypt.hash(inputs.password, 12);
    return exits.success(hashedPassword);
  },
};
