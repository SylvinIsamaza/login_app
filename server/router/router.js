const express=require('express');
const router=express.Router()
// get routes

router.get('generateOTP',(req,res)=>{
    res.send('generateOTP')
})
router.get('user/:username',(req,res=>{
    res.send('user')

}))
router.get('verifyOTP',(req,res)=>{
    res.send('verifyOTP')
})
router.get('createResetSession',(req,res)=>{
res.send('resetSession')
})
//  post routes
router.post('/register',(req,res)=>{
    res.send('register api')
})
router.post('/login',(req,res)=>{
    res.send('login api')
})
router.post('/authenticate',(req,res)=>{
    res.send('authenticate api')
})
// put routes
router.put('/update',(req,res)=>{
    res.send('update api')
})







module.exports = router