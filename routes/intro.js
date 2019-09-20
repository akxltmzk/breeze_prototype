const express = require('express');
const router = express.Router();
const IntroImage = require('../models/introimage')

// get intro page
router.get('/', async function(req, res) {
  IntroImage.find({},(err,introimages)=>{
    res.render('intro', {introimages: introimages})   
    console.log(introimages)
    
  })
  
})



module.exports = router;
