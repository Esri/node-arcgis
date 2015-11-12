/**
 * Gets all tags and their counts that have been used by the user.
 * @returns {Promise} On resolution will return an object of the users tags.
 */

let tags = function () {
return this.arcgis.request(`community/users/${this.username}/tags`)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = tags