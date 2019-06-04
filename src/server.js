require("./config/config");
const express = require('express');
const mysql = require('mysql');
const port  = process.env.PORT;
const bodyParser = require('body-parser');
const {Dbutils,connectDb} = require("./db/dbUtils");

const infoRouter = require('./routers/info');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const db = connectDb();

app.use(infoRouter);

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

