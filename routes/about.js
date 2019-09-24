const express = require('express');
const router = express.Router();
const AboutImage = require('../models/aboutimage')

// get intro page
router.get('/about', function(req, res) {
  AboutImage.find({},(err,aboutimages)=>{
    res.render('about', {aboutimages: aboutimages})     
  })
})

module.exports = router;
