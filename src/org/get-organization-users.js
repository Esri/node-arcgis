/**
 * Gets users in an orgnaization by ID, or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @param {Number} Number of users to return per page. Max is 100. Default is 100.
 * @returns {Promise} On resolution will return paginated users object.
 */

let getOrganizationUsers = (orgId, num) => ago.request(`portals/${orgId}/users`, {'num': num || 100})

module.exports = getOrganizationUsers