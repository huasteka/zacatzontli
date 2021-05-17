const sails = require('sails');

// Before running any tests...
before(function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift(
    {
      // Your Sails app's configuration files will be loaded automatically,
      // but you can also specify any other special overrides here for testing purposes.
      datastores: {
        default: {
          adapter: 'sails-disk',
          inMemoryOnly: true
        },
      },
      hooks: { grunt: false },
      log: { level: 'warn' },
    },
    (err) => {
      if (err) {
        return done(err);
      }

      // Here you can load fixtures.
      const validUser = { name: 'Test', email: 'test@test.com', password: 't3st4d0' };
      return User.create(validUser, (err) => done(err));
    }
  );
});

// After all tests have finished...
after(async () => {
  // Here you can clear fixtures.
  await User.destroy({});

  await sails.lower();
});
