const mysql = require("mysql");
let db;

//create new tables if database not exists
function initialDatabe(){


}

function connectDb() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "airport"
  });
  db.connect(err => {
    if (err) {
      db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
      });
      db.connect(err => {
        if (err) {
          console.log("Cannot connect to mySQL server");
        }
        console.log("Db not exists yet, creating new db...");
        let sql = "CREATE DATABASE IF NOT EXISTS airport";
        db.query(sql, (err, result) => {
          if (err) console.log("error", err);
          //console.log(result);
        });
      });
    } else {
      console.log("Connected");
    }
  });
  return db;
}
// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : a===1 ? 'airport' :''
// });

class Dbutils {

}

module.exports = { Dbutils, db, connectDb };
