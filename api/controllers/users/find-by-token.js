/**
 * @api {get} /users/profile Fetch user profile
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName FetchUserProfile
 * @apiHeader {String} Authorization Generated JWT token
 */
module.exports = {
  friendlyName: 'Get profile',

  description: 'Get user details using the JWT authentication token',

  exits: {
    success: {
      statusCode: 200,
    },
  },

  fn: async function (inputs, exits) {
    // The JWT passport extension saves the user
    // in the request using the JWT token provided
    exits.success(this.req.user);
  },
};
