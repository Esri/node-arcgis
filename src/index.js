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
    request: (url, form = {}, rootUrl = 'http://www.arcgis.com/sharing/rest/') => {
      if (!form.public){
        form.token = token
      }
      form.f     = 'pjson'
      return rq.get(`${rootUrl}${url}`, form)
    },
    user: {
      getUser: require('./user/get-user'),
      getContent: require('./user/get-user-content')
    },
    organization: {
      getOrganization: require('./org/get-organization'),
      getUsers: require('./org/get-organization-users'),
      getContent: require('./org/get-organization-content'),
      getSummary: require('./org/get-organization-summary')
    },
    group: {
      getGroup: require('./group/get-group'),
      getContent: require('./group/get-group-content')
    },
    items: {
      getItem: require('./items/get-item'),
      getTags: require('./items/get-tags')
    },
    usage: {
      getUsage: require('./usage/usage'),
      getSummary: require('./usage/get-summary'),
      stypeToService: require('./usage/stype-to-service'),
      parseProduct: require('./usage/parse-product'),
      flatten: require('./usage/flatten-data'),
      periodToMs: require('./usage/period-to-ms')
    },
    billing: {
      getBilling: require('./billing/billing')
    }
  }
  return ago
}

module.exports = client