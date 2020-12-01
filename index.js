const express = require('express')
const app = express();
const routes = require('./routes/router');
/*const mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user:'user2',
    password:'password',
    database:'TODOS'
});*/

app.use('/api',routes);

app.listen(5000,()=>console.log("Started on 5000"));