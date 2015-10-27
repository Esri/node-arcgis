/**
 * Gets item by ID
 * @param {String} Item ID
 * @returns {Promise} On resolution will return Item Object
 */

let getItem = itemId => ago.request(`content/items/${itemId}`)

module.exports = getItem