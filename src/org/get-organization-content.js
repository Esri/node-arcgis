/**
 * Gets items owned by an organization by organization ID or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
 * @returns {Promise} On resolution will return paginated users object.
 */

let getOrganizationContent = function (orgId, num) {
  // TODO: Figure out what the desired org object is, and write processing logic to accomplish that
  return ago.request(`search`, {'q': '\"\" accountid:' + orgId, 'num': num || 100})
}

module.exports = getOrganizationContent