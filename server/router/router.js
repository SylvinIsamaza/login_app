const express=require('express');
const{createUser, login,updateUser,generateOTP}=require('../controllers/appController');
const {auth,verifyUser}= require('../middleware/auth');
const UserModel = require('../model/User.model');
const router=express.Router()
const mongoose=require('mongoose');
// get routes

router.get('/generateOTP',verifyUser,generateOTP)
router.get('/user/:username',(req,res)=>{
    res.send('user')

})
router.get('/verifyOTP',(req,res)=>{
    res.send('verifyOTP')
})
router.get('/createResetSession',(req,res)=>{
res.send('resetSession')
})
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