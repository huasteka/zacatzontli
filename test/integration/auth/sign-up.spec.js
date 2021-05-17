const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('POST /api/auth/sign-up', () => {

  it('should sign an user up', async () => {
    const validUser = {
      name: 'Sign Up',
      email: 'sign.up@test.com',
      password: 's1gnUP!'
    };

    const res = await chai.request(sails.hooks.http.app)
      .post('/api/auth/sign-up')
      .send(validUser);

    res.should.have.status(201);
  });

  it('should return a 400 bad request status', async () => {
    const invalidUser = {};

    const res = await chai.request(sails.hooks.http.app)
      .post('/api/auth/sign-up')
      .send(invalidUser);

    res.should.have.status(400);
  });

});
