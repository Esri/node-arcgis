/**
 * Gets user profile object
 * @returns {Promise} User profile object.
 */

let get = function () {
  return ago.request(`community/users/${this.username}`)
  .then(function (results){
    return results
  })
}

module.exports = get