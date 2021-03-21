const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
// @ts-ignore
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'Vbrand',
    port: '5432'
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
module.exports = {
    db,
    passwordEncryption,
    passwordCheck,
}
