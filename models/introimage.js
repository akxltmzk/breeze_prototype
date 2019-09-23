const mongoose = require('mongoose')


const IntroImageSchema = new mongoose.Schema({
  imagename: [String]
})

const IntroImage = mongoose.model('IntroImage', IntroImageSchema)

module.exports = IntroImage