/**
 * Gets items owned by a user by username.
 * @param {String} Username who's content is desired
 * @returns {Promise} On resolution will return an object of all the users content.
 */

let getUser = function () {
  return ago.request(`community/users/${this.username}`)
  .then(function (results){
    return results
  })
}

module.exports = getUser