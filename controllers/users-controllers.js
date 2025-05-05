const { insertUser, findUserByEmail } = require("../models/users-models");
const bcrypt = require("bcrypt");

function signupUser(req, res, next) {
  const { name, username, email, password, role } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).send({ msg: "Missing required fields" });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return insertUser(name, username, email, hashedPassword, role);
    })
    .then((newUser) => {
      res
        .status(201)
        .send({ user: { name: newUser.name, email: newUser.email } });
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).send({ msg: "Email already registered" });
      } else {
        next(err);
      }
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ msg: "Missing required fields" });
  }

  findUserByEmail(email)
    .then((user) => {
      if (!user) {
        throw { status: 401, msg: "Invalid email or password!" };
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          throw { status: 401, msg: "Invalid email or password" };
        }

        res.status(200).send({
          user: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      });
    })
    .catch((err) => {
      if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
      } else {
        next(err);
      }
    });
}

module.exports = { signupUser, loginUser };
