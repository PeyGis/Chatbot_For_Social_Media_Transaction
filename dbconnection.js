/**
 *@author Pages Coffie
 *@version Version 1.0
 *Created at 2018/07/15
 *Nsano Move-Bot Project
 */
var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: '', 
    port: '3306', 
    database: 'move_bot'  
});  
module.exports = connection;  