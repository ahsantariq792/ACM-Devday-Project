const express = require("express");
const {authenticate}=require('../Middleware/authMiddleware');
const router = express.Router();
const LoginController = require('../Controllers/Login')



router.post('/loginUser',LoginController.login)
router.get('/logout',LoginController.logout)



module.exports=router