const UserModel = require("../model/User.model")

const auth=async(req,res,next)=>{
  const {username}=req.method==="GET"?req.query:req.body
  if(!username){
    console.log('username must not be empty')
    return res.status(404).send('username must not be empty')
    
  }
  else{
    try{
        const user=await UserModel.findOne({username:username})
        .then((user)=>{
            if(user==null){
                console.log('user not found')
                res.send('user not found')
                req.username=username
            }
            else{
                console.log('user found')
                // res.send("user found"+user)
                next()
            }
            
          
        })
        .catch(err=>{
            console.log(err)
            res.status(404).send('user not found')
        })
    }
    catch(err){
        console.log(err)||'error'
    }
  }
}
module.exports=auth