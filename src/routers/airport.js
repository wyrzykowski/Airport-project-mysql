const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/airport`,(req,res)=>{

    let data = {
        name:req.body.name,
        runway_id:req.body.runway_id,
    };

    makeQuery('INSERT INTO airport SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/airport',(req,res)=>{
    makeQuery('SELECT * FROM airport').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;