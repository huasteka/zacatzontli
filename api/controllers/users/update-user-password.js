/**
 * @api {post} /users/:userId/change-password Change user password
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName UpdateUserPassword
 * @apiHeader {String} Authorization Generated JWT token
 */
module.exports = {
  friendlyName: 'Update password',

  description: 'Change a user password using a plain text new password.',

  inputs: {
    userId: {
      description: 'The unique user identificator.',
      type: 'number',
      required: true,
    },

    password: {
      description: 'The plain text new password.',
      type: 'string',
      required: true,
    },

    passwordConfirmation: {
      description: 'The confirmation of the same plain text password.',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Password was changed successfully.',
      statusCode: 200,
    },

    passwordConfirmationDoesntMatch: {
      description: 'The password confirmation doesn\'t match the informed password.',
      statusCode: 400,
    },

    notFound: {
      description: 'User could not be found.',
      statusCode: 404,
    },
  },

  fn: async function (inputs, exits) {
    if (inputs.password !== inputs.passwordConfirmation) {
      throw 'passwordConfirmationDoesntMatch';
    }

    const foundUser = await User.findOne({ id: inputs.userId });

    if (!foundUser) {
      throw 'notFound';
    }

    const hashedPassword = await sails.helpers.security.hashPassword(
      inputs.password
    );

    await User.updateOne({ id: inputs.userId }).set({ password: hashedPassword });

    exits.success(foundUser);
  },
};
