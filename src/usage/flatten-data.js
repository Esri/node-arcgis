/**
* Flattens data and formats it for Dimple graphs
* @param {Object} full response from usage API
* @return {Object} usage totals, usage summary by product, and array of formatted graph data
*/
let flatten = function (response) {

  if (!response.data.length) {
    return response
  }

  var data = {
    period: response.period,
    credits: 0,
    products: [],
    graphData: [],
    start: parseInt(response.data[0].credits[0][0], 10),
    end: parseInt(response.data[0].credits[response.data[0].credits.length - 1][0], 10)
  }

  response.data.forEach(function (sevice, index){
    var product = usage.getProduct(service)
    var name = usage.stypeToService(service.stype)

    if (product) {
      product.name = name
      data.products.push(product)
    }

    service.totalCredits = 0
    service.credits.forEach(function(entry){
      service.totalCredits += parseFloat(entry[1])
    })

    if (service.totalCredits > 0) {
      data.credits += service.totalCredits

      service.credits.forEach(function(entry){
        data.graphData.push({
          name: name,
          date: parseInt(entry[0], 10),
          credits: parseFloat(entry[1])
        })
      })
    }
  })

  return data
}

module.exports = flatten