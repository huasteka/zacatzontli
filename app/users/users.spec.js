const chai = require("chai");
const chaiHttp = require("chai-http");

const User = require("./users.model");
const userService = require("./users.service");
const authService = require("../auth/auth.service");
const server = require("../../index");

chai.should();
chai.use(chaiHttp);

describe("GET /api/users/:userId", () => {
  const validUser = {
    name: "Test",
    email: "test@test.com",
    password: "t3st3r"
  };

  let token = "";

  before((done) => {
    authService.signUp(validUser).then((data) => {
      token = data.token;
      userService.findByEmail(validUser.email).then((user) => {
        validUser._id = user._id;
        done();
      });
    });
  });

  it("should return an user by id", (done) => {
    chai.request(server)
      .get(`/api/users/${validUser._id}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should return a 404 not found status", (done) => {
    chai.request(server)
      .get("/api/users/1")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  after((done) => {
    User.remove({}, () => done());
  });
});

describe("PUT /api/users/:userId", () => {
  const validUser = {
    name: "Test",
    email: "test@test.com",
    password: "t3st3r"
  };

  let token = "";

  before((done) => {
    authService.signUp(validUser).then((data) => {
      token = data.token;
      userService.findByEmail(validUser.email).then((user) => {
        validUser._id = user._id;
        done();
      });
    });
  });

  it("should update the user's name", (done) => {
    const updated = {name: "Updated Test Name"};
    chai.request(server)
      .put(`/api/users/${validUser._id}`)
      .send(updated)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("name", updated.name);
        done();
      });
  });

  it("should return a 422 un-processable entity status", (done) => {
    chai.request(server)
      .put(`/api/users/${validUser._id}`)
      .send({email: "another@test.com"})
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

  it("should return a 404 not found status", (done) => {
    chai.request(server)
      .put("/api/users/1")
      .send({name: "Updated Test"})
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  after((done) => {
    User.remove({}, () => done());
  });
})
;

describe("DELETE /api/users/:userId", () => {
  const validUser = {
    name: "Test",
    email: "test@test.com",
    password: "t3st3r"
  };

  let token = "";

  beforeEach((done) => {
    authService.signUp(validUser).then((data) => {
      token = data.token;
      userService.findByEmail(validUser.email).then((user) => {
        validUser._id = user._id;
        done();
      });
    });
  });

  it("should delete the user", (done) => {
    chai.request(server)
      .delete(`/api/users/${validUser._id}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        userService.findById(validUser._id)
          .then((data) => {
            chai.expect(data).to.be.null;
            done();
          });
      });
  });

  it("should return a 404 not found status", (done) => {
    chai.request(server)
      .delete("/api/users/1")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  after(done => {
    User.remove({}, () => done())
  });
});

describe("POST /api/users/:userId/change-password", () => {
  const validUser = {
    name: "Test",
    email: "test@test.com",
    password: "t3st3r"
  };

  let token = "";

  before(done => {
    authService.signUp(validUser).then((data) => {
      token = data.token;
      userService.findByEmail(validUser.email).then((user) => {
        validUser._id = user._id;
        done();
      });
    });
  });

  it("should update the user's password", (done) => {
    const updated = {password: "ch4ng3r", passwordConfirmation: "ch4ng3r"};
    chai.request(server)
      .post(`/api/users/${validUser._id}/change-password`)
      .send(updated)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        userService.findByEmail(validUser.email).then((user) => {
          const isEqual = userService.isValidPassword(user, updated.password);
          chai.expect(isEqual).to.be.true;
          done();
        });
      });
  });

  it("should return a 404 not found status", (done) => {
    const updated = {password: "ch4ng3r", passwordConfirmation: "ch4ng3r"};
    chai.request(server)
      .post("/api/users/1/change-password")
      .send(updated)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("should return a 422 un-processable entity status", (done) => {
    const updated = {password: "ch4ng3r", passwordConfirmation: "r3gn4hc"};
    chai.request(server)
      .post(`/api/users/${validUser._id}/change-password`)
      .send(updated)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

  after(done => {
    User.remove({}, () => done())
  });
})
;
