const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Register } = require("./../db");

const loginRouter = express.Router();


loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await Register.findOne({ email });
      if (!user) {
        res.statusCode = 401;
        return res.json({ message: "Authentication failed: User not found" });
      }
  
      if (password !== user.password) { // compare plain text password with hashed password
        res.statusCode = 401;
        return res.json({ message: "Authentication failed: Invalid password" });
      }
  
      res.statusCode = 200;
      res.json({ message: "Authentication successful" });
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.json({ error: "there was an error logging in" });
    }
  });
    // const { email, password } = req.body;
    // console.log(email);
    // console.log(password);
    // try {
    //   const user = await Register.findOne({ email });
    //   if (!user) {
    //     res.statusCode = 401;
    //     return res.json({ message: "Authentication failed: User not found" });
    //   }
    //   console.log(user);
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     res.statusCode = 401;
    //     return res.json({ message: "Authentication failed: Invalid password" });
    //   }

    //   res.statusCode = 200;
    //   res.json({ message: "Authentication successful" });
    // } catch (err) {
    //   console.log(err);
    //   res.statusCode = 500;
    //   res.json({ error: "there was an error logging in" });
    // }
//   });
  
  module.exports = loginRouter;