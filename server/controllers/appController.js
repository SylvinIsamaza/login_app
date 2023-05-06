const mongoose=require('mongoose')
const UserModel=require('../model/User.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

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
    res.status(201).send('user successfully registered')
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
async function updateUser(user){
try{
    const updatedUser=await UserModel.findOneAndUpdate({username:username},{new:true})
    res.send(updatedUser)
}
catch(err){
console.log(err)||"failed to update the user"
}
}
module.exports={createUser,login}