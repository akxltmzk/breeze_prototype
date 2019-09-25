const express = require('express');
const router = express.Router();
const portfolioimage = require('../models/portfolioimage')

router.get('/portfolio', function(req, res) {
  portfolioimage.find({},(err,portfolioimages)=>{
    res.render('portfolio', {portfolioimages: portfolioimages})        
  })
})

module.exports = router;
