const mysql = require('mysql');

const dbconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'new_senselive3',
});

module.exports = dbconnection;