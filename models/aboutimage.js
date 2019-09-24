const mongoose = require('mongoose')


const AboutImageSchema = new mongoose.Schema({
  headerimage: String
})

const AboutImage = mongoose.model('AboutImage', AboutImageSchema)

module.exports = AboutImage
