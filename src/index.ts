import express from "express";
const app = express();
const port = 4001;
const initAPIs = require("./routers/index.router");



app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.post('/verify',function(req,res){
//
//     if(req.body.otp==otp){
//         res.send("You has been successfully registered");
//     }
//     else{
//         res.render('otp',{msg : 'otp is incorrect'});
//     }
// });
//
// app.post('/resend',function(req,res){
//     var mailOptions={
//         to: email,
//         subject: "Otp for registration is: ",
//         html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
//     };
//
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         res.render('otp',{msg:"otp has been sent"});
//     });

//Router
initAPIs(app)




app.listen(port,()=>{
    console.log("Connect " + port);
})
