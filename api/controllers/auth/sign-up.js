/**
 * @api {post} /auth/sign-up Register user
 * @apiVersion 2.0.0
 * @apiGroup Auth
 * @apiName SignUp
 *
 * @apiBody {String} name
 * @apiBody {String} email
 * @apiBody {String} password
 * @apiSuccess (201) {String} token Generated JWT token
 * @apiUse ErrorHandler
 */
module.exports = {
  friendlyName: 'Register user',

  description: 'Register a new user and generate an authentication JWT token',

  inputs: {
    name: {
      description: 'User name',
      type: 'string',
      required: true,
    },

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
      description: 'User was created successfully',
      statusCode: 201,
    },
  },

  fn: async function (inputs, exits) {
    const createdUser = await User.create(inputs).fetch();

    const token = await sails.helpers.security.createToken.with({
      userId: createdUser.id,
    });

    exits.success({ token });
  },
};
