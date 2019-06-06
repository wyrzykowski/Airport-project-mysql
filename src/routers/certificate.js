const express = require('express');
const router = new express.Router();
const {makeQuery} = require("./../db/dbUtils");

router.post(`/certificate`,(req,res)=>{

    let data = {
        model_id:req.body.model_id,
        date:req.body.date,
        pilot_id: req.body.pilot_id
    };

    makeQuery('INSERT INTO certificate SET ?',data).then(e=>{
        console.log(e);
        res.send(data);
    }).catch(e=>{
        res.status(400).send(e);
        console.log(e);
    })
});
router.get('/certificate/:model_id',(req,res)=>{
    makeQuery(`SELECT * FROM certificate WHERE certificate.model_id=${req.params.model_id}`).then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
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


router.get('/certificate/model-pilot',(req,res)=>{
    makeQuery('SELECT employee.name, model.name FROM pilot JOIN certificate ON certificate.pilot_id=pilot.pilot_id JOIN employee ON employee.employee_id = pilot.pilot_id JOIN model ON model.model_id = certificate.model_id GROUP BY certificate.model_id;').then(e=>{
        console.log(e);
        res.send(e);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e);
    })
});



module.exports = router;