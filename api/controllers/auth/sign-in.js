/**
 * @api {post} /auth/sign-in Authenticate user
 * @apiVersion 2.0.0
 * @apiGroup Auth
 * @apiName SignIn
 *
 * @apiBody {String} email
 * @apiBody {String} password
 * @apiSuccess (200) {String} token Generated JWT token
 * @apiUse ErrorHandler
 */
module.exports = {
  friendlyName: 'Sign in a user',

  description: 'Verify if a user has valid credentials to receive a JWT token',

  inputs: {
    email: {
      description: 'User email',
      type: 'string',
      required: true,
    },

    password: {
      description: 'User plain text password',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'User has authenticated successfully',
      statusCode: 200,
    },

    userNotFound: {
      description: 'User supplied incorrect credentials',
      statusCode: 401,
    },

    passwordDontMatch: {
      description: 'User supplied incorrect credentials',
      statusCode: 401,
    },
  },

  fn: async function (inputs, exits) {
    const user = await User.findOne({ email: inputs.email });

    if (!user) {
      throw 'userNotFound';
    }

    const isValid = await sails.helpers.security.isValidPassword.with({
      password: inputs.password,
      hashedPassword: user.password,
    });

    if (!isValid) {
      throw 'passwordDontMatch';
    }

    const token = await sails.helpers.security.createToken.with({
      userId: user.id,
    });

    exits.success({ token });
  },
};
