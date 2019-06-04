const express = require('express');
const router = new express.Router();
const info ={name:'Airport project 2019',ver:' 1.0.0'};


router.get(`/info`,(req,res)=>{
    console.log("INFO");
    res.send(info)
});

module.exports = router;