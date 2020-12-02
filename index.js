const express = require('express')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var con = mysql.createConnection({
    host:'localhost',
    user:'user2',
    password:'password',
    database:'TODOS'
});

app.get('/api/users',(req,res)=>{
    con.query('SELECT UserId FROM Users',(err,result,fields)=>{
        if(err) throw err;
        res.json(result);
    })
});

app.post('/api/users/add',(req,res)=>{
    let data = {
        UserId: req.body.UserId,
        Password: req.body.Password
    };
    let que = 'INSERT INTO Users SET ?';
    con.query(que,data,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: true,
            results:result
        });
    })
})

app.listen(5000,()=>console.log("Started on 5000"));