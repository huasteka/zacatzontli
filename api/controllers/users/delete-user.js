/**
 * @api {delete} /users/:userId Delete user
 * @apiVersion 2.0.0
 * @apiGroup User
 * @apiName DeleteUser
 * @apiHeader {String} Authorization Generated JWT token
 *
 * @apiParam {Number} userId
 * @apiUse ErrorHandler
 */
module.exports = {
  friendlyName: 'Delete user',

  description: 'Remove an user from the database using the ID',

  inputs: {
    userId: {
      description: 'User ID supplied in the URL called',
      type: 'number',
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },

    notFound: {
      description: 'The user that was requested to be deleted was not found',
      statusCode: 404,
    },
  },

  fn: async function (inputs, exits) {
    const removedUser = await User.destroyOne({ id: inputs.userId });

    if (!removedUser) {
      throw 'notFound';
    }

    exits.success();
  },
};
