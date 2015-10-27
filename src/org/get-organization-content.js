/**
 * Gets items owned by an organization by organization ID or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
 * @returns {Promise} On resolution will return paginated users object.
 */

let getOrganizationContent = function (orgId, num) {
  return ago.request(`search`, {'q': '\"\" accountid:' + orgId, 'num': num || 100})
  .then(function (results){
    console.log(results)
    return results
  })
}

module.exports = getOrganizationContent