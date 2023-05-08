const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Register } = require("./../db");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Register.findOne({ email });
    if (!user) {
      res.statusCode = 401;
      return res.json({ message: "Authentication failed: User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
      res.statusCode = 200;
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ token, userId: user._id  });
      console.log(user);
    //   res.json({ message: "Authentication successful" });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ error: "there was an error logging in" });
  }
});


module.exports = loginRouter;
