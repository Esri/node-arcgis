/**
 * Gets items owned by a user by username.
 * @param {String} Username who's content is desired
 * @returns {Promise} On resolution will return an object of all the users content.
 */

let content = function (folder) {
  if (folder) {
    var folderUrl = `/${folder}`
  } else {
    var folderUrl = ``
  }
  return ago.request(`content/users/${this.username}${folderUrl}`)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = content