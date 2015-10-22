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
    getUserContent: require('./get-user-content'),
    getOrganization: require('./get-organization'),
    getOrganizationUsers: require('./get-organization-users'),
    getOrganizationContent: require('./get-organization-content'),
    getOrganizationSummary: require('./get-organization-summary'),
    getGroup: require('./get-group'),
    getGroupContent: require('./get-group-content'),
    getTags: require('./get-tags'),
    usage: {
      getUsage: require('./usage/usage'),
      getSummary: require('./usage/get-summary'),
      getTopUsers: function(num, start, end) { console.log('getTopUsers')},
      getProducts: function(num, start, end) { console.log('getProducts')},
      getApplication: function(id, start, end) { console.log('getApplication')},
      getService: function(id, start, end) { console.log('getService')},
      stypeToService: require('./usage/stype-to-service'),
      parseProduct: require('./usage/parse-product'),
      flatten: require('./usage/flatten-data'),
      periodToMs: require('./usage/period-to-ms')
    }
  }
  return ago
}

module.exports = client