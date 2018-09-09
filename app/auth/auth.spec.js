const chai = require("chai");
const chaiHttp = require("chai-http");

const User = require("../users/users.model");
const userService = require("../users/users.service");
const server = require("../../index");

chai.should();
chai.use(chaiHttp);

describe("POST /api/auth/sign-up", () => {
  beforeEach((done) => {
    User.remove({}, () => done());
  });

  it("should sign an user up", (done) => {
    const validUser = {
      name: "Test",
      email: "test@test.com",
      password: "t3st3r"
    };
    chai.request(server)
      .post("/api/auth/sign-up")
      .send(validUser)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should return a 400 bad request status", (done) => {
    const invalidUser = {};
    chai.request(server)
      .post("/api/auth/sign-up")
      .send(invalidUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("POST /api/auth/sign-in", () => {
  const validUser = {
    email: "test@test.com",
    password: "t3st3r"
  };

  const invalidUser = {
    email: "test@test.com",
    password: "wr0ng3r"
  };

  before((done) => {
    User.remove({}, () => {
      new User({
        email: validUser.email,
        password: userService.hashPassword(validUser.password)
      }).save(() => done());
    });
  });

  it("should sign an user in", (done) => {
    chai.request(server)
      .post("/api/auth/sign-in")
      .send(validUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should return a 401 forbidden status", (done) => {
    chai.request(server)
      .post("/api/auth/sign-in")
      .send(invalidUser)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

after(() => process.exit(0));
