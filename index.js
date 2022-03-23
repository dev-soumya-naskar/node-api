const con = require('./connection');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    con.query("select * from students",(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});

app.post('/',(req,res)=>{
   const data = req.body;
   con.query("INSERT INTO students SET ?",data,(err,result)=>{
    if(err){
        throw err;
    }else{
        res.send(result);
    }
});
});

app.put('/:id', (req,res)=>{
    const data = [req.body.name,req.body.email,req.body.phone,req.params.id];
    con.query("UPDATE students SET name = ?,email=?,phone=? where id = ?",data,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
});

app.delete('/:id', (req,res)=>{
    let student_id = req.params.id;
    con.query("DELETE from students where id = "+student_id,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
})
app.listen(4200);