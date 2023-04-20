const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Register} = require("./../db");
require('dotenv').config();

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
    let newUser;
    try {
      console.log("req.body", req.body);
      newUser = await Register.create(req.body);
  
      await newUser.validate();
      await newUser.save();

    //   const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res.statusCode = 200;
      res.json({
        // token,
        user: newUser,
        message: "success"
      });
      console.log(res.json);
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.json({
        error: "there was an error creating a new user"
      })
    }
  });
 

  module.exports = registerRouter;