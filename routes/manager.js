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

/* -------------------------------- post --------------------------------------- */

// create db(initialize)
router.post('/manager/createdb',(req,res)=>{

  CreateDB()
  
  res.redirect('/manager')  
})

// upload data 
router.post('/manager/uploadimage',upload.single('imageupload'),async (req,res)=>{

  let postData = JSON.parse(req.body.data)

  if(postData.page === 'intropage')
    await IntroDBdataUpdate(postData)
  else if(postData.page === 'aboutpage')
    await AboutDBdataUpdate(postData)
  else if(postData.page === 'portfoliopage')
    await PortfolioDBdataUpdate(postData)

  res.redirect('/manager')     
})

// delete data
router.post('/manager/deleteimage',async (req,res)=>{

  let postData = JSON.parse(req.body.data)

  if(postData.page === 'intropage')
    await IntroDBdataDelete(postData)
  else if(postData.page === 'aboutpage')
    await AboutDBdataDelete(postData) 
  else if(postData.page === 'portfoliopage')
    await PortfolioDBdataDelete(postData)

  res.redirect('/manager')     
})

/* -------------------------------- get --------------------------------------- */

// render manager page
router.get('/manager', async function(req, res) {
  // send db data to pug
  let introPage = await Page.find({pagename: "intro"})
  let aboutPage = await Page.find({pagename: "about"})
  let portfolioPage = await Page.find({pagename: "portfolio"})

  Page.find ({},(err,page)=>{
    res.render('manager',{
      introPage : introPage ,
      aboutPage : aboutPage ,
      portfolioPage : portfolioPage
    })     
  })
})

// render create db page
router.get('/manager-createdb', function(req, res) {
  res.render('manager-createdb')     
})

/*--------------------------------function --------------------------------------*/

// create db , db를 클라우드에 올리기전에 db를 생성하는 기능(프로젝트 완료후 삭제)
async function CreateDB(){
  await introdb()
  await aboutdb()
  await portfoliodb()
}

function introdb(){
  Page.create( { pagename:'intro' , 
    contents:{
      content:{
        headerimagePath:'',
        galleries:[
          {
            name: 'intropageimage',
            images:[

            ]
          }
        ]
      }
    }
    } 
  )
}

function aboutdb(){
  Page.create( { pagename:'about' , 
  contents:{
    content:{
      headerimagePath:'',
      galleries:[
        {
          name: 'aboutpageimage',
          images:[]
        }
        ]
      }
    }
    } 
  )
}

function portfoliodb(){
  Page.create( { pagename:'portfolio' , 
  contents:{
    content:{
      headerimagePath:'',
      galleries:[
          {
            name: 'foodstyling',
            images:[]
          },
          {
            name: 'candle',
            images:[]
          }
        ]
      }
    }
    } 
)
}


// intro part manager function

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
      let image = introImageLayer.find(function(obj){return obj.index == postdata.index})
      introImageLayer.pull(image)
      page.save()
      resolve()
   
    })
  })
}

// about part manager function

function AboutDBdataUpdate(postdata){
  return new Promise((resolve, reject) => {    
    Page.findOne({'pagename':'about'},(err,page) => {
      page.contents.content.headerimagePath = 'images/aboutpage/headerimage.jpg'
      page.save() 
      resolve()
    })

  })
}

function AboutDBdataDelete(postdata){

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
    Page.findOne({'pagename':'about'},(err,page) => {
      page.contents.content.headerimagePath = ''
      page.save()     
      resolve()      
    })
  })
}

// portfolio part manager function

function PortfolioDBdataUpdate(postdata){
  return new Promise((resolve, reject) => {  
    Page.findOne({'pagename':'portfolio'},(err,page) => {
      if(postdata.section === 'foodstyling')
      {
        let foodstylingimagelayer = page.contents.content.galleries.find(function (obj) {return obj.name === "foodstyling"})
        foodstylingimagelayer.images.push({
          index : '' ,
          path: 'images/portfoliopage/foodstyling/'+ postdata.imagename}
        )
        page.save()
      }    

      resolve()
    })
  })
}

function PortfolioDBdataDelete(postdata){

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
    Page.findOne({'pagename':'portfolio'},(err,page) => {
      if(postdata.section === 'foodstyling')
      {

        let foodstylingimagelayer = page.contents.content.galleries.find(function (obj) {return obj.name === "foodstyling"}).images   
        let image = foodstylingimagelayer.find(function(obj){return obj.id == postdata.id})
        foodstylingimagelayer.pull(image)
        page.save()
      }  
      resolve()
   
    })
  })
}


module.exports = router
