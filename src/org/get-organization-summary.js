/**
 * Gets summary of an orgnaization by ID or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @returns {Promise} On resolution will return a string of the Organization summary.
 */

let getOrganizationSummary = () => {
  return ago.request(`portals/self/resources/localizedOrgProperties`)
  .then(function (results){
    console.log(results)
    if (results.default) return results.default.description
  })
}

module.exports = getOrganizationSummary