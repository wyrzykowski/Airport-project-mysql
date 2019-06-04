const mysql= require('mysql');
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});

module.exports=db;