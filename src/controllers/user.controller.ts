const {db,passwordEncryption} = require("./index");
export async function getUser  (req, res) {
    const response = await db.query('SELECT * FROM accounts.user');
    res.status(200).json(response.rows);
}
interface IRegisterUser{
    email:string,
    password:string,
    name:string
}
export function register(req,res){
    const value:IRegisterUser = req.body

         db.query(
            `INSERT INTO accounts.user(email, password_crypt, name) VALUES ($1,$2,$3)`,[value.email,passwordEncryption(value.password),value.name])
            .then((result)=>{
               return  res.status(200).json({
                   message:"Success!"
               })
            }
        ).catch((e)=>{
                console.log(e)
                res.statusCode = 400;
                return res.json(e.detail)
            });
}
