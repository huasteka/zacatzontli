/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async () => {

  // By convention, this is a good place to set up fake data during development.

  if (await User.count() > 0) {
    return;
  }

  await User.createEach([
    { name: 'John Doe', email: 'john.doe@example.com', password: 'P@ssw0rd1' },
    { name: 'Jane Doe', email: 'jane.doe@example.com', password: 'P@ssw0rd2' },
    // etc.
  ]);

};
