const mysql = require('mysql');

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
        con.query(que,'USE1',(err,result,fields)=>{
            if(err) throw err;
            res.json(result);
            next();
        })
    });
}