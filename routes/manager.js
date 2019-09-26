const express = require('express');
const router = express.Router();
const Page = require('../models/page')
const multer  = require('multer')

router.get('/manager', function(req, res) {

  // send intro image
  Page.find({},(err,page)=>{
    res.render('manager',{page:page})     
  })
})

module.exports = router;
