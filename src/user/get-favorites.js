/**
 * Gets items a user has favortied by username.
 * @param {String} Group ID
 * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
 * @returns {Promise} On resolution will return paginated content object..
 */

let getFavorites = userName => {
  return ago.request(`community/users/${userName}`)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = getFavorites