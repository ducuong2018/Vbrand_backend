const { Pool } = require('pg');
const  jwt = require("jsonwebtoken")
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'Vbrand',
    port: '5432'
});
export async function getUser  (req, res) {
    const response = await db.query('SELECT * FROM accounts.user');
    console.log("1")
    res.status(200).json(response.rows);
};
interface IRegisterUser{
    email:string,
    password:string,
    name:string
}
function authenticateToken(req, res) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    console.log("1")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        // next() // pass the execution off to whatever request the client intended
    })
}
export async function registerUser(req,res){
    const value:IRegisterUser = req.body

        console.log("1")
        await db.query(
            `INSERT INTO accounts.user(email, password_crypt, name) VALUES ($1,$2,$3)`,[value.email,value.password,value.name])
            .then((result)=>{
               return  res.json(result.rows)
            }
        ).catch((e)=>{
                console.log(e)
                res.statusCode = 400;
                return res.json(e.detail)
            });
}
