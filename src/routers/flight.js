const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/flight`,(req,res)=>{

    let data = {
        flight_date:req.body.flight_date,
        destination_airport_id:req.body.destination_airport_id,
        origin_airport_id:req.body.origin_airport_id,
        pilot_1_id:req.body.pilot_1_id,
        pilot_2_id:req.body.pilot_2_id
    };

    makeQuery('INSERT INTO flight SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/flight',(req,res)=>{
    makeQuery('SELECT * FROM flight').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/flight/info',(req,res)=>{
    makeQuery('SELECT a2.name origin,a1.name destination, employee.name, employee.surname FROM flight JOIN airport a1 ON flight.destination_airport_id = a1.airport_id JOIN airport a2 ON flight.origin_airport_id = a2.airport_id JOIN pilot ON flight.pilot_1_id=pilot.pilot_id JOIN employee ON employee.employee_id=pilot.pilot_id').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

// router.get('/flight/details',(req,res)=>{
//     makeQuery('SELECT airport.name AS destination, airport.name AS origin, flight.flight_date FROM airport INNER JOIN flight ON flight.destination_airport_id=airport.airport_id ').then(e=>{
//         console.log(e);
//         res.send(e);
//     }).catch(e=>{
//         console.log(e);
//         res.status(400).send(e);
//     })
// });

module.exports = router;