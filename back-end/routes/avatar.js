const express = require('express');
const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Register } = require("./../db");

const avatarRouter = express.Router();

avatarRouter.post('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    //find by user id
    const user = await Register.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // console.log(user);

    //photos!!
    const { avatarUrl } = req.body;
    if (avatarUrl) {
      user.avatarUrl = avatarUrl;
    }
    // console.log(user.avatarUrl);

    await user.save();

    res.status(200).send('Avatar URL updated');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


module.exports = avatarRouter;
