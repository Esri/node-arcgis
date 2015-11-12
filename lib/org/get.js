/**
 * Gets organization by ID, or urlKey.
 * @returns {Promise} On resolution will return Organization Object
 */

var sanitizeHtml = require('sanitize-html')

let get = function() {
  var getSummary = this.summary
  return this.arcgis.request(`portals/${this.id}`)
  // Clean Org Description
  .then(function (org) {
    org.description = sanitizeHtml(org.description)
    console.log(org)
    return org
  })
}

module.exports = get