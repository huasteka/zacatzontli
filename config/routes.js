/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /api/auth/sign-up': { controller: 'auth', action: 'sign-up' },

  'POST /api/auth/sign-in': { controller: 'auth', action: 'sign-in' },

  'GET /api/users/profile': { controller: 'users', action: 'find-by-token' },

  'GET /api/users/:userId': { controller: 'users', action: 'find-by-id' },

  'PUT /api/users/:userId': { controller: 'users', action: 'update-user' },

  'DELETE /api/users/:userId': { controller: 'users', action: 'delete-user' },

  'POST /api/users/:userId/change-password': { controller: 'users', action: 'update-user-password' },

};
