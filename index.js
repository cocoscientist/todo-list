const express = require('express')
const app = express();

app.get('/api/values',(req,res)=>{
    const js1 = [
        {
            'id':1,
            'name':"Tom"
        },
        {
            'id':2,
            'name':"Boi"
        },
        {
            'id':3,
            'name':"Bel"
        },
    ];
    res.json(js1);
});

app.listen(5000,()=>console.log("Started on 5000"));