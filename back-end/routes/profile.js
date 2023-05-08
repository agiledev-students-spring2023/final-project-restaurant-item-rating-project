const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Register } = require("./../db");

const profileRouter = express.Router();

//get profile
profileRouter.get('/:id',async(req,res)=>{
const userId = req.params.id;
  try {
    const user = await Register.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user);
    res.status(200).json({ email: user.email, password: user.password, avatarUrl: user.avatarUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//create profile
profileRouter.post('/:id', async (req, res) => {
    const userId = req.params.id;
    const { email, password } = req.body;
    try {
      const user = await Register.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (email) {
        user.email = email;
      }
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      // Save user
      await user.save();
  
      res.statusCode = 200;
      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = profileRouter;