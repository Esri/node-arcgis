/**
 * Update the user object.
 * @param {Object} Options to update on the user
 * @returns {Promise} Updated user object.
 */

 let update = function (options = {}) {
  console.log(this)
  return ago.request(`content/users/${this.username}/update`)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = update