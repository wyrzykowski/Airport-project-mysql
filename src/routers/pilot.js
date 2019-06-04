const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/pilot`,(req,res)=>{

    let data = {
        employee_id:req.body.employee_id,
        certificate_id:req.body.certificate_id,
    };

    makeQuery('INSERT INTO pilot SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/pilot',(req,res)=>{
    makeQuery('SELECT * FROM pilot').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;