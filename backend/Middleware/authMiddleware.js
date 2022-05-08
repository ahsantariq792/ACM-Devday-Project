const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateAccessToken = (user) => {
  console.log(user.toJSON());
  return jwt.sign(user.toJSON(), `${process.env.SECRET_KEY}`);
}


// const User=require("../model/userSchema")

exports.authenticate= async (req,res,next)=>{
try{
    
  const authHeader = await req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) 
  {
    return res.sendStatus(401);
  }
  jwt.verify(token,`${process.env.SECRET_KEY}`, (err, user) => {
  
     console.log(user)
     console.log(req.query.userId)
    if (req.query.userId == user) {
      // console.log(user)
      return next();
    }
    else{
      return res.status(403).send("Unauthorized:No token provided");
    }

    
  
  });
  

}catch (err){

    res.status(401).send("Unauthorized:No token provided");
    console.log("here",err)

}


}