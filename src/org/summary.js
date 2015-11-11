/**
 * Gets summary of an orgnaization by ID or urlKey.
 * @returns {Promise} On resolution will return a string of the Organization summary.
 */

let summary = function () {
  return this.arcgis.request(`portals/self/resources/localizedOrgProperties`)
  .then(function (results){
    console.log(results)
    return results.default.description
  })
}

module.exports = summary