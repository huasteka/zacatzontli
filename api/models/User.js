/**
 * @apiDefine UserModel
 * @apiSuccess (200) {Number} id
 * @apiSuccess (200) {String} name
 * @apiSuccess (200) {String} email
 * @apiSuccess (200) {Date} createdAt
 * @apiSuccess (200) {Date} updatedAt
 */
module.exports = {
  tableName: 'users',

  attributes: {
    name: {
      type: 'string',
      required: true,
      maxLength: 300,
    },

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },

    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },

  beforeCreate: async function (user, proceed) {
    const hashedPassword = await sails.helpers.security.hashPassword(
      user.password
    );
    user.password = hashedPassword;
    proceed();
  },
};
