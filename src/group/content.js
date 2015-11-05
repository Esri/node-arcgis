/**
 * Gets items contained in a group
 * @returns {Promise} On resolution will return an object of the groups content.
 */

let content = function (num = 100) {
  return this.arcgis.request(`search`, {'q': '\"\" group:' + this.id, 'num': num})
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = content