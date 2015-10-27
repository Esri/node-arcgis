/**
 * Gets users in an orgnaization by ID, or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @param {Number} Number of users to return per page. Max is 100. Default is 100.
 * @returns {Promise} On resolution will return paginated users object.
 */

let getOrganizationUsers = (options = {num: 100}) => ago.request(`portals/self/users`, options)

module.exports = getOrganizationUsers