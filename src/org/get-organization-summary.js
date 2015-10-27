/**
 * Gets summary of an orgnaization by ID or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @returns {Promise} On resolution will return a string of the Organization summary.
 */

http://esripdx.maps.arcgis.com/sharing/rest/portals/self/resources/localizedOrgProperties

let getOrganizationSummary = orgId => {
  return ago.request(`portals/${orgId}}/resources/localizedOrgProperties`)
  .then(function (results){
    if (results.default) return results.default.description

  })
}

module.exports = getOrganizationSummary