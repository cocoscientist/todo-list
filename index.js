const express = require('express')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
        extended:false
    })  
);
app.use(bodyParser.json());
const validator = require('./validation/Validation');

var con = mysql.createConnection({
    host:'localhost',
    user:'user2',
    password:'password',
    database:'TODOS'
});

app.get('/api/users/count/:user',(req,res)=>{
    let que = 'SELECT COUNT(*) FROM Users WHERE UserId=\"'+req.params.user+'\"';
    con.query(que,(err,result,fields)=>{
        if(err) throw err;
        res.json(result);
    });
});

app.post('/api/users/register',(req,res)=>{
    let data = {
        UserId: req.body.UserId,
        Password: req.body.Password
    };
    const { errors, isValid} = validator.validationFunc(data);
    if(!isValid){
        return res.status(400).json(errors);
    }

    let que = 'INSERT INTO Users SET ?';
    
    con.query(que,data,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: true,
            results: data
        });
    })
});

app.get('/api/todos/:user',(req,res)=>{
    let que = 'SELECT TodoId,Title,Status FROM Todos WHERE UserId=\"'+req.params.user+'\"';
    con.query(que,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: true,
            results: result
        });
    });
});

app.post('/api/users/login',(req,res)=>{
    let data = {
        UserId: req.body.UserId,
        Password: req.body.Password
    };
    let que = 'SELECT UserId, Password FROM Users WHERE UserId=\"'+data.UserId+'\" AND PASSWORD=\"'+data.Password+'\"';
    con.query(que,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: (result.length===1),
        });
    })
});

app.post('/api/todos/add/:user',(req,res)=>{
    let data = {
        UserId: req.params.user,
        Title: req.body.title
    };
    let que = 'INSERT INTO Users (UserId,Title) SET ?';
    con.query(que,data,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: true,
            results:result
        });
    })
});

app.delete('/api/todos/delete',(req,res)=>{
    //todo
});

app.listen(5000,()=>console.log("Started on 5000"));