require("./config/config");
const express = require('express');
const mysql = require('mysql');
const port  = process.env.PORT;
const bodyParser = require('body-parser');
const {Dbutils,connectDb} = require("./db/dbUtils");

const infoRouter = require('./routers/info');
const employeeRouter = require('./routers/employee');
const flightRouter = require('./routers/flight');
const runwayRouter = require('./routers/runway');
const technician = require('./routers/technician');
const plane = require('./routers/plane');
const model = require('./routers/model');
const certificate = require('./routers/certificate');
const passenger = require("./routers/passenger");
const pilot = require("./routers/pilot");
const airport = require("./routers/airport");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const db = connectDb();

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    next();
});

app.use(infoRouter);
app.use(employeeRouter);
app.use(flightRouter);
app.use(runwayRouter);
app.use(technician);
app.use(plane);
app.use(model);
app.use(certificate);
app.use(passenger);
app.use(pilot);
app.use(airport);


// let sql = 'CREATE TABLE IF NOT EXISTS posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
// db.query(sql,(err,result)=>{
//     if(err) console.log(err);
//     else{
//         console.log("query ok");
//     }
// });
//
// const data = {title:"testuje tytul",body:'hehhehe'};
// let sql = 'INSERT INTO posts SET ?';
// db.query(sql,data,(err,result)=>{
//     if(err) console.log(err);
//     else{
//         console.log("query ok");
//     }
// });





app.listen(port,()=>{
    console.log("server is running on port: " + port )
});

module.exports={app};

