/*const mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user:'user2',
    password:'password',
    database:'TODOS'
});

exports.getUsers = (req,res,next)=>{
    con.connect(err=>{
        if(err) throw err;
        con.query('SELECT UserId FROM Users',(err,result,fields)=>{
            if(err) throw err;
            res.json(result);
            next();
        })
    });
}

exports.getTasks = (req,res,next)=>{
    con.connect(err=>{
        if(err) throw err;
        let que = 'SELECT TodoId,Title,Status FROM Todos WHERE UserId=?';
        let data = {UserId:req.body.UserId};
        con.query(que,data,(err,result,fields)=>{
            if(err) throw err;
            res.json(result);
            next();
        })
    });
}

exports.addUser = (req,res,next)=>{
    let que = 'INSERT INTO Users VALUES ?';
    let data = {UserId:req.body.UserId,Password:req.body.Password};
    con.query(que,data,(err,result,fields)=>{
        if(err) throw err;
        res.json(result);
        next();
    })
}*/