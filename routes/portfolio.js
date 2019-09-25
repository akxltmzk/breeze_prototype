const express = require('express');
const router = express.Router();
const portfolioimage = require('../models/portfolioimage')
const fs = require('fs')
const jo = require('jpeg-autorotate')

router.get('/portfolio', function(req, res) {
  portfolioimage.find({},(err,portfolioimages)=>{
    res.render('portfolio', {portfolioimages: portfolioimages})        
  })
})

router.get('/image-orientation-fix', function(req, res) {
  const options = {quality: 80}
  const foodStylePath = './public/images/portfolioimage/foodstyling'
  
  fs.readdir(foodStylePath, (err, files) => {
    if(err) console.log(err)
    files.forEach(file => {
      jo.rotate(foodStylePath+'/'+file, options, (error, buffer, orientation, dimensions, quality) => {
        if (error) {
          console.log('An error occurred when rotating the file: ' + error.message)
          return
        }
        fs.writeFile(foodStylePath+'/'+file, buffer, 'base64', function(err) {
          if(err){
            console.log(err) 
            return
          }
          console.log('file saved !')
        })
      })
    })
  })

  res.send('done')


})

module.exports = router;
