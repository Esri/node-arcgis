
/**
 * Gets an item
 * @returns {Promise} On resolution will return Item Object
 */

let get = function() {
  return this.arcgis.request(`content/items/${this.id}`)
  .then(function (results) {
    console.log(results)
    return results
  })
}

module.exports = get

