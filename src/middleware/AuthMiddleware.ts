 // @ts-ignore
 const jwtHelper = require("../helpers/jwt.helper");

 // Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
 // @ts-ignore
 const accessTokenSecret = "cuongdc";

 const isAuth = async (req,res)=>{
     const tokenFromClient =  req.headers["x-access-token"];
     if(tokenFromClient){
         try {
             const decoded =  await jwtHelper.verifyToken(tokenFromClient,accessTokenSecret);
             req.jwtDecoded = decoded;
         }catch(error){
             console.log(error);
             return res.status(401).json({
                 message:"Unautheorized"
             })
         }
     }
     else {
         return  res.status(403).send({
             message:"No token"
         });
     }
 }
 module .exports = {
     isAuth:isAuth
 }
