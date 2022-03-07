/**
 * @api {get} /users/:userId Fetch user
 * @apiVersion 2.0.0
 * @apiGroup User
 * @apiName FetchUser
 * @apiHeader {String} Authorization Generated JWT token
 *
 * @apiParam {Number} userId
 * @apiUse UserModel
 * @apiUse ErrorHandler
 */
module.exports = {
  friendlyName: 'Find user by ID',

  description: 'Find a user using it\'s database ID',

  inputs: {
    userId: {
      description: 'The ID from the user to be searched for',
      type: 'number',
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },

    notFound: {
      description: 'User with informed ID could not be found',
      statusCode: 404,
    },
  },

  fn: async function ({ userId }) {
    const foundUser = await User.findOne({ id: userId });

    if (!foundUser) {
      throw 'notFound';
    }

    return foundUser;
  },
};
