
const mysql = require('mysql2');

const DBconnection = mysql.createPool({
    host:'salasardb1.cl4hxfnr1mxc.us-east-1.rds.amazonaws.com',
    user:'admin',
    port: "3306",
    password:'admin_123',
    //database:'new_senselive3',
    database:'SalasarDB'
});

module.exports = DBconnection;

