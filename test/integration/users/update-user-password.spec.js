const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('POST /api/users/:userId/change-password', () => {
  let validUser;
  let token;

  beforeEach(async () => {
    const payload = { name: 'Updated', email: 'updated@test.com', password: 'Upd4t3d' };
    validUser = await User.create(payload).fetch();
    token = await sails.helpers.security.createToken(validUser.id);
  });

  it('should update the user\'s password', async () => {
    const payload = { password: 'ch4ng3r', passwordConfirmation: 'ch4ng3r' };

    const res = await chai.request(sails.hooks.http.app)
      .post(`/api/users/${validUser.id}/change-password`)
      .send(payload)
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(200);

    const updatedUser = await User.findOne({ id: validUser.id });
    const isEqual = await sails.helpers.security.isValidPassword.with({
      password: payload.password,
      hashedPassword: updatedUser.password,
    });
    chai.expect(isEqual).to.be.true;
  });

  it('should return a 404 not found status if user is not found', async () => {
    const payload = { password: 'ch4ng3r', passwordConfirmation: 'ch4ng3r' };

    const res = await chai.request(sails.hooks.http.app)
      .post('/api/users/9999/change-password')
      .send(payload)
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(404);
  });

  it('should return a 400 bad request status', async () => {
    const updated = { password: 'ch4ng3r', passwordConfirmation: 'r3gn4hc' };

    const res = await chai.request(sails.hooks.http.app)
      .post(`/api/users/${validUser.id}/change-password`)
      .send(updated)
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(400);
  });

  afterEach(async () => {
    await User.destroyOne({ id: validUser.id });
  });
});
