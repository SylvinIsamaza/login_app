const express=require('express')
const mongoose=require('mongoose')
const url='mongodb://127.0.0.1:27017/'
mongoose.set('strictQuery',true)
function connect(){
    try{
     mongoose.connect(url)
        .then(()=>{
            console.log('connect success')
    
        })
        .catch(err=>{
            console.log('connection failed')
        })
    }
    catch(error){
console.log(error)
    }
}
module.exports=connect

