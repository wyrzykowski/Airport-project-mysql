const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/employee`,(req,res)=>{

    let employee = {
        name:req.body.name,
        surname:req.body.surname,
        age:req.body.age
    };

    console.log(employee);
    makeQuery('INSERT INTO employee SET ?',employee).then(e=>{
        console.log(e);
        res.send(employee);
    }).catch(e=>{
        console.log(e);
    })
});

router.get('/employee',(req,res)=>{
    makeQuery('SELECT * FROM employee').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
    })
});

module.exports = router;