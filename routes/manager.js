const express = require('express')
const router = express.Router()
const Page = require('../models/page')
const multer  = require('multer')
const fs = require('fs')
const _ = require('lodash')

// multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = JSON.parse(req.body.data).destination
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    let imagename = JSON.parse(req.body.data).imagename
    cb(null, imagename)
  }
})

let upload = multer({storage: storage})

/* ---------------------------------------------------------------------------------------- */


router.post('/manager/uploadimage',upload.single('imageupload'),async (req,res)=>{

  let postData = JSON.parse(req.body.data)

  if(postData.page === 'intropage')
    await IntroDBdataUpdate(postData)

  res.redirect('/manager')     
})

router.post('/manager/deleteimage',async (req,res)=>{

  let postData = JSON.parse(req.body.data)

  if(postData.page === 'intropage')
    await IntroDBdataDelete(postData)
    
  res.redirect('/manager')     
})


router.get('/manager', function(req, res) {
  // send intro image pug
  Page.find({},(err,page)=>{
    res.render('manager',{page:page})     
  })
})

/*------------------------------ -function --------------------------------------*/

//  intro

function IntroDBdataUpdate(postdata){
  return new Promise((resolve, reject) => {  
    Page.findOne({'pagename':'intro'},(err,page) => {
      let introimagelayer = page.contents.content.galleries.find(function (obj) {return obj.name === "intropageimage"})
      introimagelayer.images.push({
        index : postdata.index ,
        path: 'images/intropage/introimage'+postdata.index+'.jpg'}
      )
      page.save()
      resolve()
    })
  })
}

function IntroDBdataDelete(postdata){

  // delete image in file
  const path = postdata.destination

  try{
    fs.unlinkSync(path)
  }
  catch(err){
    console.log(err)
  }

  // delete image path in mongo data
  return new Promise((resolve, reject) => {  
    Page.findOne({'pagename':'intro'},(err,page) => {
      let introImageLayer = page.contents.content.galleries.find(function (obj) {return obj.name === "intropageimage"}).images   
     

    
     
      page.save()
      resolve()
   
    })
  })
}


module.exports = router
