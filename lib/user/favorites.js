/**
 * Gets items a user has favorited.
 * @returns {Promise} On resolution will return an object of all the users favorite content.
 */

let favorites = function () {
  console.log(this)
  return this.get()
  .then(user => {
    console.log(user.favGroupId)
    let favGroup = this.arcgis.group(user.favGroupId)
    return favGroup.content()
  })
  .then(function (results) {
    console.log(results)
    return results
  })
}

 module.exports = favorites
