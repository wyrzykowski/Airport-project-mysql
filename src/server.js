require("./config/config");
const express = require('express');
const mysql = require('mysql');
const port  = process.env.PORT;
const {Dbutils,connectDb} = require("./db/dbUtils");

const app = express();

const db = connectDb();

let sql = 'CREATE TABLE IF NOT EXISTS posts2(id int)';
db.query(sql,(err,result)=>{
    if(err) console.log(err);
    else{
        console.log("query ok");
    }

});

//Connect
// db.connect((err)=>{
//     if(err){
//         // if cannot Connect try create new Database
//         dbNew.connect((err)=> {
//             if(err){
//                 console.log({Error: ("Cannot connect to DB")});
//             }
//         else{
//                 // //Create DB if not exists
//                 Dbutils.createDb();
//             }
//
//
//         });
//
//     }else {
//         console.log("Db connected")
//     }
//
// });
//





app.listen(port,()=>{
    console.log("server is running on port: " + port )
});

module.exports={app};

