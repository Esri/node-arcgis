
/**
 * Gets an item
 * @returns {Promise} On resolution will return Item Object
 */

let get = function(client = this) {
  return client.arcgis.request(`content/items/${client.id}`)
  .then(function (results) {
    console.log(results)
    return results
  })
}

module.exports = get

