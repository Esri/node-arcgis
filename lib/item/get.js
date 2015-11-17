/**
 * Gets an item
 * @returns {Promise} On resolution will return Item Object
 */

let get = function(item = this) {
  return item.request(`content/items/${item.id}`)
  .then(function (results) {
    console.log(results)
    return results
  })
}

module.exports = get
