const express = require('express');
const router = express.Router();
const IntroImage = require('../models/introimage')

// get intro page
router.get('/', function(req, res) {

  IntroImage.find({},(err,introimages)=>{
    console.log(introimages);
    
    res.render('intro', {introimages: introimages})
  })


    //create

    //IntroImage.create({imagename:"testinsert"})
  
})



module.exports = router;
