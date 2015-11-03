/**
 * Gets items owned by a user by username.
 * @param {String} Username who's content is desired
 * @returns {Promise} On resolution will return an object of all the users content.
 */

let content = function () {
  return ago.request(`content/users/${this.username}`)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = content