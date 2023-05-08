const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Register } = require("./../db");
require("dotenv").config();

const registerRouter = express.Router();

//create user w register
registerRouter.post("/", async (req, res) => {
  let newUser;
  try {
    const user = await Register.findOne({ email: req.body.email });
    if (user) {
      res.statusCode = 401;
      return res.json({ message: "Email already taken" });
    }

    // console.log("req.body", req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //   newUser = await Register.create(req.body);
    newUser = await Register.create({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.validate();
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.statusCode = 200;
    res.json({
      token,
      user: newUser,
      message: "success",
    });

  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      message: "there was an error creating a new user",
      error: err
    });
  }
});

module.exports = registerRouter;
