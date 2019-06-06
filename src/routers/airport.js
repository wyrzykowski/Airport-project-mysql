const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/airport`,(req,res)=>{

    let data = {
        name:req.body.name
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

router.get('/airport/plane',(req,res)=>{
    makeQuery('SELECT plane.name AS plane_name, airport.name AS hangared_in, plane.registration AS plane_registration FROM airport INNER JOIN plane ON plane.airport_id=airport.airport_id;').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/airport/arrival',(req,res)=>{
    makeQuery('SELECT airport.name AS airport_name, flight.flight_date AS Arrival_time, flight.flight_id FROM airport INNER JOIN flight ON airport.airport_id=flight.destination_airport_id;').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/airport/departure',(req,res)=>{
    makeQuery('SELECT airport.name AS airport_name, flight.flight_date AS Departure_time, flight.flight_id FROM airport INNER JOIN flight ON airport.airport_id=flight.origin_airport_id;').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/airport/count-plane',(req,res)=>{
    makeQuery('SELECT COUNT(plane.plane_id) AS "How many plane on airport", airport.name FROM plane JOIN airport ON airport.airport_id=plane.airport_id GROUP BY airport.airport_id').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;