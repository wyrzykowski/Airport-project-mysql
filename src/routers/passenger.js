const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/passenger`,(req,res)=>{

    let data = {
        name:req.body.name,
        surname:req.body.surname,
        age:req.body.age,
        flight_id:req.body.flight_id
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

router.get('/passenger/name-age',(req,res)=>{
    makeQuery(`SELECT passenger.name,passenger.age FROM passenger WHERE passenger.age<18 AND passenger.name LIKE \'a%\'`).then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/passenger/adult',(req,res)=>{
    makeQuery(`SELECT * FROM passenger WHERE passenger_id NOT IN( SELECT passenger_id FROM passenger WHERE passenger.age<18)`).then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;