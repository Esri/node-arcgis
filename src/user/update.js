/**
 * Update the user object.
 * @param {Object} Options to update on the user
 * @returns {Promise} Updated user object.
 */

let update = function (options) {
  return ago.request(`content/users/${this.username}/update`, options)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = update