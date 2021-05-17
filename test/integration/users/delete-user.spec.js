const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('DELETE /api/users/:userId', () => {
  it('should return a 404 not found status if user is not found', async () => {
    let validUser = await User.findOne({ email: 'test@test.com' });
    let token = await sails.helpers.security.createToken(validUser.id);

    const res = await chai.request(sails.hooks.http.app)
      .delete('/api/users/9999')
      .set('Authorization', `Bearer ${token}`);

    res.should.have.status(404);
  });

  it('should delete the user', async () => {
    const deleteUserPayload = { name: 'Deleted', email: 'deleted@test.com', password: 'D3le7Ed' };
    const deleteUser = await User.create(deleteUserPayload).fetch();
    const deleteUserToken = await sails.helpers.security.createToken(deleteUser.id);

    const res = await chai.request(sails.hooks.http.app)
      .delete(`/api/users/${deleteUser.id}`)
      .set('Authorization', `Bearer ${deleteUserToken}`);

    res.should.have.status(200);

    const deletedUser = await User.findOne({ id: deleteUser.id });
    chai.expect(deletedUser).to.be.undefined;
  });
});
