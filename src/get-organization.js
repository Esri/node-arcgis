/**
 * Gets organization by ID, or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @returns {Promise} On resolution will return Organization Object
 */

let getOrganization = orgId => ago.request(`portals/${orgId}`)

module.exports = getOrganization