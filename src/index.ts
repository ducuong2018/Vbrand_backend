import express from "express";
const app = express();
const port = 4001;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routers/user.router'));
app.listen(port,()=>{
    console.log("Connect " + port);
})
