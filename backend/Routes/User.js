const express = require("express");
const {authenticate}=require('../Middleware/authMiddleware');
const router=express.Router()

const user=require('../Controllers/User')

router.post('/signup',user.signup)
router.get("/getusers",authenticate,user.getalltheusers);



module.exports=router