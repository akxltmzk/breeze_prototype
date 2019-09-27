const express = require('express')
const router = express.Router()
const Page = require('../models/page')
const multer  = require('multer')
const fs = require('fs')

// 파일 업로드
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = JSON.parse(req.body.data).destination
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    let imagename = JSON.parse(req.body.data).imagename
    cb(null, imagename)
  }
})

var upload = multer({storage: storage})

// 파일 업로드 post
router.post('/manager',upload.single('imageupload'),async (req,res)=>{

  let postData = JSON.parse(req.body.data)

  if(postData.page === 'intropage')
    await IntroDBdataUpdate(postData)

  res.redirect('/manager')     
})


router.get('/manager', function(req, res) {
  // send intro image pug
  Page.find({},(err,page)=>{
    res.render('manager',{page:page})     
  })
})

function IntroDBdataUpdate(postdata){
  return new Promise((resolve, reject) => {  
    Page.findOne({'pagename':'intro'},(err,page) => {
      let item = page.contents.content.galleries.find(function (obj) {return obj.name === "intropageimage"})
      item.images.push({
        index : postdata.index ,
        path: 'images/intropage/introimage'+postdata.index+'.jpg'}
      )
      page.save();
      resolve();
    })
  })
}



module.exports = router;
