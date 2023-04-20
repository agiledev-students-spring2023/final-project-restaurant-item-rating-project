const express = require('express');
const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Register } = require("./../db");

const avatarRouter = express.Router();


avatarRouter.post('/', async (req, res) => {
    try {
      const { email} = req.body;
  
      const user = await Register.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send('Avatar URL updated');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });


module.exports = avatarRouter;