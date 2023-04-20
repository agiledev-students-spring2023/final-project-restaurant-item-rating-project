const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Register } = require("./../db");

const profileRouter = express.Router();

profileRouter.post('/', async (req, res) => {
    const { oldEmail, email, oldPassword, password } = req.body;
    console.log(email);
    console.log(password);
    console.log(oldEmail);
    console.log(oldPassword);
    try {
        const user = await Register.findOne({ email: oldEmail });
        if (!user) {
          res.statusCode = 401;
          return res.json({ message: "Authentication failed: User not found" });
        }
        
 
        if (oldPassword && password) {
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      
            if (passwordMatch) {
              return res.status(401).json({ message: "Invalid old password" });
            }
      
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
          }
      
          if (email) {
            user.email = email;
          }
  
      // Save user
      await user.save();
  

    res.statusCode = 200;
    res.json({ message: "Profile updated successfully" });
}   catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ error: "There was an error updating the profile" });
  }
});



module.exports = profileRouter;