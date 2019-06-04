const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/certificate`,(req,res)=>{

    let data = {
        model_id:req.body.model_id,
        date:req.body.date,
    };

    makeQuery('INSERT INTO certificate SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/certificate',(req,res)=>{
    makeQuery('SELECT * FROM certificate').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;