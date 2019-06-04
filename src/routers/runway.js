const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/runway`,(req,res)=>{

    let data = {
        length:req.body.length,
        name:req.body.name,
        direction:req.body.direction
    };

    makeQuery('INSERT INTO runway SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/runway',(req,res)=>{
    makeQuery('SELECT * FROM runway').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;