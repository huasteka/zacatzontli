const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('GET /api/users/profile', () => {
  it('should return an user by authentication token', async () => {
    let validUser = await User.findOne({ email: 'test@test.com' });
    let token = await sails.helpers.security.createToken(validUser.id);

    const res = await chai.request(sails.hooks.http.app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(200);
    res.body.should.have.property('id');
    res.body.should.have.property('name');
    res.body.should.have.property('email');
  });
});
