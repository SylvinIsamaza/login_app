const express=require('express');
const{createUser, login,updateUser,generateOTP,findUser,verifyOTP,createResetSession,resetPassword}=require('../controllers/appController');
const {auth,verifyUser}= require('../middleware/auth');
const UserModel = require('../model/User.model');
const router=express.Router()
const mongoose=require('mongoose');
const registerMail = require('../middleware/mailer');
// get routes

router.get('/generateOTP',auth,generateOTP)
router.get('/user/:username',findUser
)
router.get('/verifyOTP',verifyOTP)
router.get('/createResetSession',createResetSession)
//  post routes
router.post('/register',createUser)
router.post('/login',auth,login)
router.post('/authenticate',(req,res)=>{
    res.send('authenticate api')
})
router.post('/registerMail',registerMail)
// put routes
router.put('/update',verifyUser,updateUser)
router.put('/resetPassword',auth,resetPassword)







module.exports = router