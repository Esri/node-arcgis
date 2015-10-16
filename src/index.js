/**
 * Wrapper for arcgis api
 */
var rq = require('./lib/rq')
var uniq = require('./lib/uniq')

/**
 * Doc Block
 * @param {}
 * @returns {}
 */


/**
 * Sets up a new arcgis client
 * @param {String} Valid Token
 * @returns {Object} Object with methods for necessary routes
 */
let client = token => {
  let ago = {
    /* Automatically add client id, base url */
    /**
     * Sets ups base request to ArcGIS
     * @param {String} URL to append to root URL
     * @param {Object} Options to pass as query parameters
     * @returns {Promise} On resolution will return results
     */
    request: (url, form = {}) => {
      form.token = token
      form.f     = 'pjson'
      return rq.get(`http://www.arcgis.com/sharing/rest/${url}`, form)
    },
    /**
     * Gets item by ID
     * @param {String} Item ID
     * @returns {Promise} On resolution will return Item Object
     */
    getItem: itemId => ago.request(`content/items/${itemId}`),
    /**
     * Gets organization by ID, or urlKey.
     * @param {String} Organization ID or unique urlKey
     * @returns {Promise} On resolution will return Organization Object
     */
    getOrganization: orgId => ago.request(`portals/${orgId}`),
    /**
     * Gets users in an orgnaization by ID, or urlKey.
     * @param {String} Organization ID or unique urlKey
     * @param {Number} Number of users to return per page. Max is 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    getOrganizationUsers: orgId => ago.request(`portals/${orgId}/users`),
    /**
     * Gets items owned by an organization by organization ID or urlKey.
     * @param {String} Organization ID or unique urlKey
     * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    getOrganizationContent: (orgId, num) => ago.request(`search`, {'q': '\"\" accountid:' + orgId, 'num': num || 100}),
    /**
     * Gets group by ID.
     * @param {String} Organization ID or unique urlKey
     * @returns {Promise} On resolution will return Group Object
     */
    getGroup: groupId => ago.request(`community/groups/${groupId}`),
    /**
     * Gets unique tags from a group of items.
     * @param {Array} Array of Item objects
     * @returns {Array} Array of tag strings
     */
    getTags: items => {
      let tags = items.reduce(function (prev, current) {
        return prev.concat(current.tags)
      }, [])
      return uniq(tags)
    }
  }
  return ago
}