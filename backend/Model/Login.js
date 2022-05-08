const { userSchema } = require('../Schema/UserSchema')
const Bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport=require('passport');
// const logout = require('express-passport-logout');

const { generateAccessToken } = require('../Middleware/authMiddleware');

class LoginUser {

  Login = (body) => {
    console.log(body)
    const { email, password } = body;

    return new Promise((resolve, reject) => {
      try {
        const userMod = mongoose.model("USER", userSchema);
        userMod
          .findOne({
            email: email,
          })
          .then(async (result) => {
            if(result)
            {
              console.log(result)
              const isMatch = await Bcrypt.compare(password, result.password);
              if (!isMatch) {
  
                return reject("InvalidP");
              }
              else {
                
                await userMod.findOneAndUpdate({email}, {lastlogin: new Date()});

                // console.log(generateAccessToken)
                const accessToken = await generateAccessToken(result._id);
                console.log(accessToken)
                return resolve({
                  Token: accessToken,
                  ID: result._id,
  
                });
  
              }
            }
            else
            {
              return reject("InvalidE");
            }
          })
          .catch((err) => {
            console.log(err)
            // return reject("email Not Valid");
          });
      } catch (e) {
        return reject("Network Error");
      }
    });
  };





 
}
module.exports = new LoginUser()