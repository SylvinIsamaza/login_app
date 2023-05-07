const express=require('express');
const{createUser, login,updateUser,generateOTP,findUser,verifyOTP,createResetSession}=require('../controllers/appController');
const {auth,verifyUser}= require('../middleware/auth');
const UserModel = require('../model/User.model');
const router=express.Router()
const mongoose=require('mongoose');
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
// put routes
router.put('/update',verifyUser,updateUser)
router.put('/resetPassword',(req,res)=>{
    res.send('resetPassword')
})







module.exports = router