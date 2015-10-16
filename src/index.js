/**
 * Wrapper for arcgis api
 */
var rq = require('./lib/rq')
var uniq = require('./lib/uniq')

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
    getItem: require('./get-item'),
    getOrganization: require('./get-organization'),
    getOrganizationUsers: require('./get-organization-users'),
    getOrganizationContent: require('./get-organization-content'),
    getGroup: require('./get-group'),
    getTags: require('./get-tags')
  }
  return ago
}

module.exports = client