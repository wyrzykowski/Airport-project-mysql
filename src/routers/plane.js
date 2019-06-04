const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/plane`,(req,res)=>{

    let data = {
        name:req.body.name,
        model_id:req.body.model_id,
        registration:req.body.registration,
        airport_id:req.body.airport_id
    };

    makeQuery('INSERT INTO plane SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/plane',(req,res)=>{
    makeQuery('SELECT * FROM plane').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;