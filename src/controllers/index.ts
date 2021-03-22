const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config()
// @ts-ignore
const db = new Pool({
    user: process.env.USE_DB,
    host: process.env.Host,
    password:  process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});
const passwordEncryption  = (password:string) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }catch (e){
        console.log(e)
    }

}
// @ts-ignore
const  passwordCheck = (passwordInput:string,password_DB:string) =>{
    try {
       return  bcrypt.compareSync(passwordInput,password_DB,)
    }
    catch (e){
        console.log(e)
    }
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports = {
    db,
    passwordEncryption,
    passwordCheck,
    validateEmail
}
