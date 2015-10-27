/**
 * Gets items owned by a group by group ID
 * @param {String} Group ID
 * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
 * @returns {Promise} On resolution will return paginated content object.
 */

let getGroupContent = function (groupId, num) {
  return ago.request(`search`, {'q': '\"\" group:' + groupId, 'num': num || 100})
}

module.exports = getGroupContent