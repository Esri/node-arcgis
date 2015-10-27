/**
 * Gets group by ID.
 * @param {String} Organization ID or unique urlKey
 * @returns {Promise} On resolution will return Group Object
 */

let getGroup = groupId => ago.request(`community/groups/${groupId}`)

module.exports = getGroup