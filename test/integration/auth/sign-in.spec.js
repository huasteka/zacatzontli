const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('POST /api/auth/sign-in', () => {

  it('should sign an user in', async () => {
    const validUser = {
      email: 'test@test.com',
      password: 't3st4d0',
    };

    const res = await chai.request(sails.hooks.http.app)
      .post('/api/auth/sign-in')
      .send(validUser);

    res.should.have.status(200);
    res.body.should.have.property('token');
  });

  it('should return a 401 forbidden status', async () => {
    const invalidUser = {
      email: 'test@test.com',
      password: 'wr0ng3r',
    };

    const res = await chai.request(sails.hooks.http.app)
      .post('/api/auth/sign-in')
      .send(invalidUser);

    res.should.have.status(401);
  });

});
