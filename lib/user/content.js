/**
 * Gets items owned by a user.
 * @param {String} Folder id desired
 * @returns {Promise} On resolution will return an object of the users content.
 */

let content = function (folder) {
  if (folder) {
    var folderUrl = `/${folder}`
  } else {
    var folderUrl = ``
  }
  return this.arcgis.request(`content/users/${this.username}${folderUrl}`)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = content