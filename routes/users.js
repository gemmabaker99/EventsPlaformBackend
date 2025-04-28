const express = require("express");
const { signupUser, loginUser } = require("../controllers/users-controllers");

const usersRouter = express.Router();

usersRouter.post("/signup", signupUser);
usersRouter.post("/login", loginUser);

module.exports = usersRouter;
