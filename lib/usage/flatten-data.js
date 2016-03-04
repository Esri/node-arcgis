var stypeToService = require('./stype-to-service')
var parseProduct = require('./parse-product')

/**
* Flattens data and formats it for Dimple graphs
* @param {Object} full response from usage API
* @return {Object} usage totals, usage summary by product, and array of formatted graph data
*/
let flatten = function (response) {
  if (!response.data) {
    return response
  }

  var data = {
    period: response.period,
    credits: 0,
    products: [],
    graphData: [],
    startCredits: parseInt(response.data[0].credits[0][0], 10),
    endCredits: parseInt(response.data[0].credits[response.data[0].credits.length - 1][0], 10),
    startTime: response.startTime,
    endTime: response.endTime
  }

  response.data.forEach(function (service, index) {
    var product = parseProduct(service)
    var name = stypeToService(service.stype)

    if (product) {
      product.name = name
      data.products.push(product)
    }

    service.totalCredits = 0
    service.credits.forEach(function (entry) {
      service.totalCredits += parseFloat(entry[1])
    })

    if (service.totalCredits > 0) {
      data.credits += service.totalCredits

      service.credits.forEach(function (entry) {
        data.graphData.push({
          name: name,
          date: parseInt(entry[0], 10),
          credits: parseFloat(entry[1])
        })
      })
    }
  })

  data.credits = Math.round(data.credits * 100) / 100

  return data
}

module.exports = flatten
