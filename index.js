const express = require('express')
const app = express();
const mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user:'user2',
    password:'password',
    database:'TODOS'
});

app.get('/api/values',(req,res)=>{
    con.connect(err=>{
        if(err) throw err;
        con.query('SELECT UserId FROM Users',(err,result,fields)=>{
            if(err) throw err;
            res.json(result);
        })
    })
});

app.listen(5000,()=>console.log("Started on 5000"));