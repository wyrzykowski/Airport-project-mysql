const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/pilot`,(req,res)=>{

    let data = {
        employee_id:req.body.employee_id
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

router.get('/pilot/avg-age',(req,res)=>{
    makeQuery("SELECT AVG(employee.age) AS \"Average pilot age\" FROM employee RIGHT JOIN pilot ON pilot.employee_id = employee.employee_id").then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/pilot/sum',(req,res)=>{
    makeQuery("SELECT p1.pilot_id, COUNT(flight.flight_id) FROM flight JOIN pilot p1 ON p1.pilot_id = flight.pilot_1_id JOIN pilot p2 On p2.pilot_id = flight.pilot_2_id GROUP BY p1.pilot_id, p2.pilot_id").then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});



module.exports = router;