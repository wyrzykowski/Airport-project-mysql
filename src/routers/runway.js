const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/runway`,(req,res)=>{

    let data = {
        length:req.body.length,
        name:req.body.name,
        direction:req.body.direction,
        airport_id: req.body.airport_id
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


router.get('/runway/length/:length',(req,res)=>{
    makeQuery(`SELECT runway.name, runway.length, runway.direction FROM runway WHERE runway.length > ${req.params.length}`).then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/runway/avg',(req,res)=>{
    makeQuery(`SELECT airport.name, AVG(runway.length) FROM runway JOIN airport ON airport.airport_id=runway.airport_id GROUP BY airport.airport_id HAVING COUNT(runway.runway_id)>1`).then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;