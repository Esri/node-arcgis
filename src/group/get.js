/**
 * Gets group profile object
 * @returns {Promise} User profile object.
 */
let get = function () {
  return this.arcgis.request(`community/groups/${this.id}`)
  .then(function (results){
    return results
  })
}

module.exports = get