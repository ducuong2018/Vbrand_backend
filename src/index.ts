import express from "express";
const app = express();
const port = 4001;
const initAPIs = require("./routers/index.router");



app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Router
initAPIs(app);





app.listen(port,()=>{
    console.log("Connect " + port);
})
