//  make a request from the api
const axios=require('axios')
async function authenticate(username){
    try {
        axios.get(`/api/user/authenticate`,{username})
    } catch (error) {
        return {error:"username does not exist"}
    }
    
}
async function getUser({username}){
    try {
        const {data}=axios.get(`/api/user/${username}`)
        return data;
    } catch (error) {
        return{error:"Password does not match"}
    }
}
async function register(credentials){
    try {
        const {data,msg,status}=axios.post('/api/user/registerUser',credentials)
        let {username,email}=credentials
        
        if(status===201){
            axios.post(`api/registeMail`,{email:email,username:username,text:msg, subject:"thanks you for registering to our app"})
        }
    return Promise.resolve(msg)
        
        
    } catch (error) {
        return{error:"Username already exists"}
    }
}
async function verifyUser({username,password}){
    if(username){
       const {data}=axios.post('/api/login',{username,password})
        return Promise.resolve(data)
    }
}
async function updateUser(response){
    const token=await localStorage.getItem('token')
   const data=axios.put('/api/update',response,{headers:{"Authorization":`${token}`}})
   return Promise.resolve({data})
}
async function generateOTP(username){
   try {
    const {data,otp,status}=axios.post('api/generateOTP',{params:{username:username}})
    const text="successfully updated"
    if(status=201){
        axios.post(`api/registeMail`,{email:data.email,username:data.username,text:text, subject:"thanks you for registering to our app"})
    }
   } catch (error) {
    
   }
}