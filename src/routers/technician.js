const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/technician`,(req,res)=>{

    let data = {
        employee_id:req.body.employee_id,
        plane_id:req.body.plane_id,
        responsibilities:req.body.responsibilities
    };

    makeQuery('INSERT INTO technician SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/technician',(req,res)=>{
    makeQuery('SELECT * FROM technician').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;