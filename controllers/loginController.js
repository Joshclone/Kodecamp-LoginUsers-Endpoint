const bcrypt = require('bcrypt')
const User = require("../models/userSchema");
const {generateAccessToken} = require('../utilsLogin/authenticateUser');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  
  if (!user)
    return res
      .status(403)
      .json({error: {message: "invalid email/password"}});
  
  // Make sure the passwords are the same
  const comparePassword = await bcrypt.compare(password, user.password)

  // if they're not return an error
  if (!comparePassword)
    return res
      .status(403)
      .json({error: {message: "invalid email or password"}});
  
  user.toJSON()
  
  // create jwt token and send back to user
  const token = generateAccessToken(email)

  // add user object to request body
  req.user = user
  
    res.status(200).json({ message: "success", access_token: token, user: user });
    
};



