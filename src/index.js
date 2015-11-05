/**
 * Wrapper for arcgis api
 */
var rq = require('./lib/rq')
var uniq = require('./lib/uniq')

var Client = {
  user: require('./user/user'),
  getOrganization: require('./org/get-organization'),
  organization: {
    getUsers: require('./org/get-organization-users'),
    getContent: require('./org/get-organization-content'),
    getSummary: require('./org/get-organization-summary')
  },
  group: require('./group/group'),
  getItem: require('./items/get-item'),
  item: {
    favorite: function () {console.log('adds item to favorites')},
    rate: function () {console.log('adds rating to item')}
  },
  getFavorites: function () {console.log('get the current users favorites')},
  items: {
    getTags: require('./items/get-tags')
  },
  getUsage: require('./usage/usage'),
  usage: {
    getSummary: require('./usage/get-summary'),
    stypeToService: require('./usage/stype-to-service'),
    parseProduct: require('./usage/parse-product'),
    flatten: require('./usage/flatten-data'),
    periodToMs: require('./usage/period-to-ms')
  },
  getBilling: require('./billing/billing'),
  billing: {
    status: function(){console.log('checks status of billing')}
  }
}

/**
 * Sets up a new arcgis client
 * @param {String} Valid Token
 * @returns {Object} Object with methods for necessary routes
 */
let client = ({token = "", domain = "www.arcgis.com"} = {}) => {
  var arcgis = Object.create(Client)
  /* Automatically add client id, base url */
  /**
   * Sets ups base request to ArcGIS
   * @param {String} URL to append to root URL
   * @param {Object} Options to pass as query parameters
   * @returns {Promise} On resolution will return results
   */
  arcgis.request = (url, form = {}, post) => {
    var rootUrl = `https://${domain}/sharing/rest/`
    if (!form.public){
      form.token = token
    }
    form.f     = 'pjson'
    if (post) {
      return rq.post(`${rootUrl}${url}`, form)
    } else {
      return rq.get(`${rootUrl}${url}`, form)
    }
  }
  return arcgis
}

module.exports = client