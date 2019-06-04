const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/passenger`,(req,res)=>{

    let data = {
        name:req.body.name,
        surname:req.body.surname,
        age:req.body.age
    };

    makeQuery('INSERT INTO passenger SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/passenger',(req,res)=>{
    makeQuery('SELECT * FROM passenger').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;