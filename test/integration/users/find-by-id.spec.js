const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);



describe('GET /api/users/:userId', () => {
  let validUser;
  let token;

  beforeEach(async () => {
    validUser = await User.findOne({ email: 'test@test.com' });
    token = await sails.helpers.security.createToken(validUser.id);
  });

  it('should return an user by id', async () => {
    const res = await chai.request(sails.hooks.http.app)
      .get(`/api/users/${validUser.id}`)
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(200);
  });

  it('should return a 404 not found status', async () => {
    const res = await chai.request(sails.hooks.http.app)
      .get('/api/users/9999')
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(404);
  });
});
