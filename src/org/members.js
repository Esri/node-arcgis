/**
 * Gets users in an orgnaization
 * @param {Number} Number of users to return per page. Max is 100. Default is 100.
 * @returns {Promise} On resolution will return paginated users object.
 */

let members = function (num = 100) {
  return this.arcgis.request(`portals/self/users`, {"num": num})
  .then(function (results){
    console.log(results)
    return results.default.description
  })
}

module.exports = members