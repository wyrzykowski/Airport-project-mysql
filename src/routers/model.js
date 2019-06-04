const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/model`,(req,res)=>{

    let data = {
        name:req.body.name,
        capacity:req.body.capacity,
        max_speed:req.body.max_speed,
        height:req.body.height,
        width:req.body.width,
        min_runway:req.body.min_runway
    };

    makeQuery('INSERT INTO model SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/model',(req,res)=>{
    makeQuery('SELECT * FROM model').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;