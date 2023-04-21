const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Register } = require("./../db");

const profileRouter = express.Router();

// profileRouter.post('/', async (req, res) => {
//     const { oldEmail, email, oldPassword, password } = req.body;
//     console.log(email);
//     console.log(password);
//     console.log(oldEmail);
//     console.log(oldPassword);
//     try {
//         const user = await Register.findOne({ email: oldEmail });
//         if (!user) {
//           res.statusCode = 401;
//           return res.json({ message: "Authentication failed: User not found" });
//         }
        
 
//         if (oldPassword && password) {
//             const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      
//             if (passwordMatch) {
//               return res.status(401).json({ message: "Invalid old password" });
//             }
      
//             const hashedPassword = await bcrypt.hash(password, 10);
//             user.password = hashedPassword;
//             delete user.oldPassword;

//           }
      
//           if (email) {
//             user.email = email;
//             delete user.oldEmail;
//           }
  
//       // Save user
//       await user.save();
  

//     res.statusCode = 200;
//     res.json({ message: "Profile updated successfully" });
// }   catch (err) {
//     console.log(err);
//     res.statusCode = 500;
//     res.json({ error: "There was an error updating the profile" });
//   }
// });

profileRouter.get('/:id',async(req,res)=>{
const userId = req.params.id;
  try {
    const user = await Register.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ email: user.email, password: user.password });
    console.log(user.email);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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