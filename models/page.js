const mongoose = require('mongoose')

const PageSchema = new mongoose.Schema({
  pagename: String,
  contents: {
    content : {
      headerimagePath: String,
      galleries: [
        {name: String, paths: [String]}
      ]
    }
  }
}) 

const Page = mongoose.model('Page', PageSchema)

module.exports = Page