const nodemailer=require('nodemailer')
const mailgen=require('mailgen')
const transporter=nodemailer.createTransport({
    host:"ethereal.mail",
    port:544,
    secure:false,
    auth:{
        user:"isamazasylvain",
        pass:'gfhklgjfadssssshjgf'
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
    const email={
        body:{
            name:username,
            intro:text||'welcome to the login app',
            outro:'if you have any question please send me an email'
        }
        
        
    }
    const emailbody=Mailgenerator.generate(email)
    let message={
        from:'isamazasylvain@gmail.com',
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
    return res.status(500).send("email not sent")
})
}
module.exports=registerMail