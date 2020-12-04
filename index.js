const express = require('express')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(
    bodyParser.urlencoded({
        extended:false
    })  
);
app.use(bodyParser.json());
app.use(cors());

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
        return res.json({
            success: false,
            results: ''
        });
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

app.post('/api/users/login',(req,res,)=>{
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

app.post('/api/todos/add',(req,res)=>{
    let data = {
        UserId: req.body.UserId,
        Title: req.body.Title
    };
    let que = 'INSERT INTO Todos (UserId,Title) VALUES (\"'+data.UserId+'\",\"'+data.Title+'\")';
    con.query(que,data,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: true,
            results: result
        });
    })
});

app.put('/api/todos/change',(req,res)=>{
    let data={
        TodoId: req.body.TodoId
    }
    let que = 'UPDATE Todos SET Status=1 WHERE TodoId='+data.TodoId;
    con.query(que,data,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: true,
            results: result
        });
    })
})

app.delete('/api/todos/delete/:id',(req,res)=>{
    let data={
        TodoId: req.params.id
    }
    console.log(data);
    let que = 'DELETE FROM Todos WHERE TodoId='+data.TodoId;
    con.query(que,data,(err,result,fields)=>{
        if(err) throw err;
        res.json({
            success: true,
            results: result
        });
    });
});

app.listen(5000,()=>console.log("Started on 5000"));