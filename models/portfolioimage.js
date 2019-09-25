const mongoose = require('mongoose')


const PortfolioImageSchema = new mongoose.Schema({
  foodstyling: [String] ,
  candle: [String]
})

const PortfolioImage = mongoose.model('PortfolioImage', PortfolioImageSchema)

module.exports = PortfolioImage