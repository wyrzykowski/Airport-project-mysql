const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/flight`,(req,res)=>{

    let data = {
        flight_date:req.body.flight_date,
        destination_airport_id:req.body.destination_airport_id,
        origin_airport_id:req.body.origin_airport_id
    };

    makeQuery('INSERT INTO flight SET ?',data).then(e=>{
        console.log(data);
        const flight_id = data.flight_id;
        makeQuery('SELECT flight_id FROM flight').then(e=>{
            const flight_id=e[e.length-1].flight_id;
            let data_flight_details = {
                pilot_id:req.body.pilot_id,
                flight_id:flight_id
            };
            makeQuery('INSERT INTO flight_details SET ?',data_flight_details).then(e=> {
                console.log(e);
                res.send({...data,...data_flight_details});

            }).catch(e=>{
                res.status(400).send(e);
            });
        }).catch(e=>res.status(400).send(e));


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

module.exports = router;