const {db,passwordEncryption,validateEmail} = require("./index");
export async function getUser  (req, res) {
    const response = await db.query('SELECT * FROM accounts.user');
    res.status(200).json(response.rows);
}
interface IRegisterUser{
    email:string,
    password:string,
    name:string
}
export  function  register(req,res){
    const value:IRegisterUser = req.body
        if(!validateEmail(value.email)){
            return  res.status(400).json({
                message:"Invalid email!"
            })
        }
        else if(value.password.length <= 1){
            return  res.status(400).json({
                message:"Password!"
            })
        }
        else if(value.name.length <= 1){
            return  res.status(400).json({
                message:"Name!"
            })
        }

        db.query(
                `INSERT INTO accounts.user(email, password_crypt, name) VALUES ($1,$2,$3)`,[value.email,passwordEncryption(value.password),value.name])
                .then((result)=>{
                        return  res.status(200).json({
                            email:  value.email,
                            name:value.name

                        })
                    }
                ).catch((e)=>{
                console.log(e)
                res.statusCode = 400;
                return res.json(e.detail)
            });
}
const nodemailer=require('nodemailer');
const {setRedis,getRedis} =require("./redisOTP.controller")
export function sendOTP(req,res){
    let otp = Math.random();
    otp = otp * 100000;
    otp = parseInt(otp+"")
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service : 'Gmail',

        auth: {
            user: 'cuongdc@mcg-corp.vn',
            pass: 'Ducuong2020',
        }

    });
    const mailOptions={
        to: req.body.email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
    };

    transporter.sendMail(mailOptions,async (error, info) => {
        if (error) {
            return console.log(error);
        }
        setRedis(req.body.email,otp)
     console.log( await getRedis(req.body.email))
        return res.json(info);
    });
}
export async  function verifyOTP(req,res){
    let a = await getRedis(req.body.email)
    console.log(a)
    if(req.body.otp == a){
        console.log(a)
        return res.json({
            message:"12312"
        })
    }
    else {
        return res.json({
            message:"fasle"
        })
    }
}

