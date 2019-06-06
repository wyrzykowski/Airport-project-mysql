const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/plane`,(req,res)=>{

    let data = {
        name:req.body.name,
        model_id:req.body.model_id,
        registration:req.body.registration,
        airport_id:req.body.airport_id,
        responsibilities:req.body.responsibilities,
        employee_id:req.body.employee_id
    };

    makeQuery(`INSERT INTO plane(name,airport_id,model_id,registration) VALUES ('${data.name}',${data.airport_id},${data.model_id},"${data.registration}"); SET @person_id = LAST_INSERT_ID(); INSERT IGNORE INTO technician (responsibilities,employee_id) VALUES ("${data.responsibilities}",${data.employee_id}); SET @property_id = LAST_INSERT_ID(); INSERT INTO planetechnician (plane_id,technician_id) VALUES(@person_id, @property_id);`).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});

router.get('/plane',(req,res)=>{
    makeQuery('SELECT * FROM plane').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/plane/min-max',(req,res)=>{
    makeQuery('SELECT MIN(capacity)AS "Minimal and maximal plane capacity"  FROM model  UNION SELECT MAX(capacity) FROM model;').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

router.get('/plane/no-license',(req,res)=>{
    makeQuery('SELECT model.name FROM model WHERE model.model_id NOT IN( SELECT certificate.model_id FROM certificate)').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});

module.exports = router;