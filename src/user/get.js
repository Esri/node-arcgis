/**
 * Gets user profile object
 * @returns {Promise} User profile object.
 */
let get = function () {
  return this.arcgis.request(`community/users/${this.username}`)
  .then(function (results){
    return results
  })
}

module.exports = get