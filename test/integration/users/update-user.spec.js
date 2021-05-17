const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('PUT /api/users/:userId', () => {
  let validUser;
  let token;

  beforeEach(async () => {
    const payload = { name: 'Updated', email: 'updated@test.com', password: 'Upd4t3d' };
    validUser = await User.create(payload).fetch();
    token = await sails.helpers.security.createToken(validUser.id);
  });

  it('should update the user\'s name', async () => {
    const payload = { name: 'Updated Test Name' };

    const res = await chai.request(sails.hooks.http.app)
      .put(`/api/users/${validUser.id}`)
      .send(payload)
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(200);
    res.body.should.have.property('name', payload.name);
  });

  it('should return a 400 bad request status', async () => {
    const res = await chai.request(sails.hooks.http.app)
      .put(`/api/users/${validUser.id}`)
      .send({ email: 'another@test.com' })
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(400);
  });

  it('should return a 404 not found status if user is not found', async () => {
    const res = await chai.request(sails.hooks.http.app)
      .put('/api/users/9999')
      .send({ name: 'Updated Test' })
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(404);
  });

  afterEach(async () => {
    await User.destroyOne({ id: validUser.id });
  });
});

