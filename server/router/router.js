const express=require('express');
const{createUser, login}=require('../controllers/appController');
const auth = require('../middleware/auth');
const UserModel = require('../model/User.model');
const router=express.Router()
const mongoose=require('mongoose');
// get routes

router.get('generateOTP',(req,res)=>{
    res.send('generateOTP')
})
router.get('user/:username',(req,res)=>{
    res.send('user')

})
router.get('verifyOTP',(req,res)=>{
    res.send('verifyOTP')
})
router.get('createResetSession',(req,res)=>{
res.send('resetSession')
})
//  post routes
router.post('/register',createUser)
router.post('/login',auth,login)
router.post('/authenticate',(req,res)=>{
    res.send('authenticate api')
})
// put routes
router.put('/update',(req,res)=>{
    res.send('update api')
})
router.put('/resetPassword',(req,res)=>{
    res.send('resetPassword')
})







module.exports = router