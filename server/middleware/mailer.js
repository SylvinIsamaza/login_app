const nodemailer=require('nodemailer')
const mailgen=require('mailgen')
const dotenv=require('dotenv')
const { localVariable } = require('./auth')
dotenv.config()

const transporter=nodemailer.createTransport({
    host:process.env.HOST,
    port:process.env.PORT,
    secure:false,
    auth:{
        user:'lillian.grant@ethereal.email',
        pass:process.env.PASS
    }
})
const Mailgenerator=new mailgen({
    theme:'default',
product:{
    name:'Mailgen',
    link:'http://mailgen.js/'
}
})
async function registerMail(req,res){
    const{username,useremail,text,subject}=req.body
    /*
    
    {username:"isamazasylvain",
    useremail:"isamazasylvain@gmail.com",
    text:"welcome to the login app",
    subject:"welcome to the login app"

}
    */
    const email={
        body:{
            name:username,
            intro:text||'welcome to the login app',
            outro:`this is your OTP ${req.app.locals.OTP} if you have any question please send me an email`
        }
        
        
    }
    const emailbody=Mailgenerator.generate(email)
    let message={
        from:'lillian.grant@ethereal.email',
        to:useremail,
        subject:subject,
        html:emailbody
    }
transporter.sendMail(message)
.then(()=>{
    console.log('email successfully sent successfully')

    return res.send('email successfully sent')

}
    
)
.catch(err=>{
    console.log(process.env.USERNAME)
    console.log(err)
    return res.status(500).send("email not sent")
   
})
}
module.exports=registerMail