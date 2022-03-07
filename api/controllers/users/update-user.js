/**
 * @api {put} /users/:userId Update account
 * @apiVersion 2.0.0
 * @apiGroup User
 * @apiName UpdateUser
 * @apiHeader {String} Authorization Generated JWT token
 *
 * @apiParam {Number} userId
 * @apiBody {String} name
 * @apiUse UserModel
 * @apiUse ErrorHandler
 */
module.exports = {
  friendlyName: 'Update user',

  description: 'Update a user\'s personal information',

  inputs: {
    userId: {
      description: 'The ID to search for the user',
      type: 'number',
      required: true,
    },

    name: {
      description: 'The user name to be updated',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'User was updated successfully',
      statusCode: 200,
    },

    notFound: {
      description: 'User could not be found',
      statusCode: 404,
    },
  },

  fn: async function (inputs, exits) {
    const updatedUser = await User.updateOne({ id: inputs.userId }).set({
      name: inputs.name,
    });

    if (!updatedUser) {
      throw 'notFound';
    }

    exits.success(updatedUser);
  },
};
