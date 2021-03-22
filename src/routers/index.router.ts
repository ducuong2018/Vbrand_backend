// @ts-ignore
const express = require("express");

// @ts-ignore
const router = express.Router();
const {register,getUser,sendOTP,verifyOTP} =require("../controllers/user.controller")
// @ts-ignore
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");

const initAPIs = (app) => {
    router.post('/register', register);
    router.post('/send',sendOTP);
    router.post('/verify',verifyOTP);
    router.post('/user', getUser);
    router.post("/login", AuthController.login);
    router.post("/refresh-token", AuthController.refreshToken);

    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    router.use(AuthMiddleWare.isAuth);
    return app.use("/", router);
}

module.exports = initAPIs;
