/**
 * Update the user object.
 * @param {Object} Options to update on the user
 * @returns {Promise} Updated user object.
 */

let update = function (options) {
  return this.arcgis.request(`community/users/${this.username}/update`, options, true)
  .then(function (results){
    console.log(results)
    if (results.success) {
      return this.get()
    } else {
      return new Error(results.error)
    }
  })
}

module.exports = update