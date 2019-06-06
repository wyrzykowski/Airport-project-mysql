const mysql = require("mysql");
let db;
//get minimized sql crud to create all tables
const sqlInitializeDb = require("./initialTables.json");

//create new tables if database not exists
function initialDatabe() {
  sqlInitializeDb.initTables.forEach(sql => {
    db.query(sql, (err, result) => {
      if (err) console.log(err);
      else {
        console.log("query ok");
      }
    });
  });

  //
  // console.log(sqlInitializeDb.initDb);
  // console.log(typeof(sqlInitializeDb.initDb));
}

function connectDb() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "airportDB",
    multipleStatements: true
  });
  db.connect(err => {
    if (err) {
      db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        multipleStatements: true
      });
      db.connect(err => {
        if (err) {
          console.log("Cannot connect to mySQL server");
        }

        console.log("Db not exists yet, creating new db...");
        let sql = "CREATE DATABASE IF NOT EXISTS airportDB";
        db.query(sql, (err, result) => {
          if (err) console.log("error", err);
          else {
            db = mysql.createConnection({
              host: "localhost",
              user: "root",
              password: "",
              database: "airportDB",
              multipleStatements: true
            });

            initialDatabe();
          }
        });
      });
    } else {
      console.log("Connected");
    }
  });
  return db;
}

function makeQuery(sql, data) {
  return new Promise((resolve, reject) => {
    try {
      db.query(sql, data, (err, result) => {
        console.log(err, result, sql, data);
        if (result === undefined) {
          //maybe non connection to db, try to reconnect
          try {
            if(err==="ECONNREFUSED") connectDb();
            reject(err);
          } catch (e) {
            reject(err);
          }
        }
        resolve(result);
      });
    } catch (err) {
      console.log("fatal error",err);
      reject(err);
    }
  });
}

module.exports = { makeQuery, connectDb };
