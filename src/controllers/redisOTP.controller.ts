// //@ts-ignore
// const client = require("../helpers/redis.helper")
// const setRedis = async(key:string,OTP:number) =>{
//     await client.SET(key, OTP);
//     await client.expire(key, 60* 60);
// }
// const getRedis =  async (key:string)=>{
//
//     return new Promise((resolve, reject) => {
//         client.get(key, (e, data) => {
//             if(e){
//                 reject(e);
//             }
//             resolve(data);
//         });
//     });
//
//
// }
//
//
//
// module.exports = {
//     setRedis,
//     getRedis
// }
//
