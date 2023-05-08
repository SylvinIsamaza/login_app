const mongoose=require('mongoose')
const UserModel=require('../model/User.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const lodash=require('lodash')

const otpGenerator=require('otp-generator')
const { localVariable } = require('../middleware/auth')
async function createUser(req,res){
    const{username,email,password}=req.body
bcrypt.hash(password,10)
.then(async (hashedPassword)=>{
    const user=new UserModel({
        username,
        email,
        password:hashedPassword,
    })
    await user.save()
    console.log(user)
    res.status(201).send({msg:'user successfully registered'})
})
    
   
        
}

async function login(req,res){
    const {password,username} = req.body
   
    try{
        const user=await UserModel.findOne({username:username,password:password})

      if(!user){
        console.log("incorrect username or password")
        res.send('incorrect username or password')
      }
      else{
        console.log('successfull logged in')
       
       const token=jwt.sign({username:username,password:password},'secret')
       
       res.send({

        token:token
       })

      }
       
    }
    catch(err){
    //   console.log('incorrect username or password')
    //   res.send('incorrect username or password')
    console.log(err)
    }
    

}
async function updateUser(req,res){
    const username=req.username
    const data=req.body;
try{
    const updatedUser=await UserModel.findOneAndUpdate({username:username},data,{new:true})
    res.send(updatedUser)
}
catch(err){
console.log(err)||"failed to update the user"
}
}
async function generateOTP(req,res){
const OTP=otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
console.log(OTP)
req.app.locals.OTP=OTP
req.app.locals.resetSession=true
res.send({
    otp:OTP
})
}
async function findUser(req,res){
    const {username}=req.params
    try{
        const user=await UserModel.findOne({username:username})
        if(user==null){
            console.log("user not found")
            res.send("user not found")
        }
        else{
        
res.send(lodash.pick(user,['username','_id','email']))
        }
        
    }
    catch(err){
        console.log(err)||"user not found";
        res.send(err)
    }
}
async function verifyOTP(req,res){
    const {otp}=req.query
    console.log(req.app.locals.OTP)
    if(parseInt(otp)==parseInt(req.app.locals.OTP)){
        req.app.locals.OTP=null
        console.log("otp verified")
        res.send("otp verified")
    }
    else{
        console.log("otp not verified")
                res.send("otp not verified")
    }
}
async function createResetSession(req,res){
if(req.app.locals.resetSession){
    req.app.locals=false; // this is to allow only one to reset one reset the password
    res.status(200).send({msg:"access granted"})
}
else{
    console.log('session expired')
    res.status(400).send({msg:"access denied"})
}
}
async function resetPassword(req,res){
    if(!req.app.locals.resetSession){
        console.log('session expired')
       return res.status(400).send({msg:"session expired"})
    }
const{username,password}=req.body;
try {
    UserModel.findOne({username:username})
    .then(user =>{
        bcrypt.hash(password,10)
        .then(hashedPassword=>{
    
            UserModel.updateOne({username:username},{password:hashedPassword})
            .then(user=>{
                req.app.locals.resetSession=false;
              return res.status(201).send("record successfully updated")
            })
            .catch(error=>{
                return res.status(500).send({error:"failed to reset the password"})
            })
        })
        .catch(error=>{
            res.status(500).send({error:"unable to hash password"})
        })
    })
   
    .catch(error=>{
        return res.status(404).send({error:"user not found"})
    })
} catch (error) {
    return res.status(500).send(error)
}
}
module.exports={createUser,login,updateUser,generateOTP,findUser,verifyOTP,createResetSession,resetPassword}