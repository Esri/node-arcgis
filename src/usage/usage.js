/**
 * Gets Usage
 * @param {Object} Usage options
 * @returns {Promise} On resolution will return Item Object
 */

let getUsage = (options) => ago.request(`portals/self/usage`, options)

module.exports = getUsage