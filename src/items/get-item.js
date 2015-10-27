/**
 * Gets item by ID
 * @param {String} Item ID
 * @returns {Promise} On resolution will return Item Object
 */

let getItem = itemId => {
  return ago.request(`content/items/${itemId}`)
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = getItem