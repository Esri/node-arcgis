/**
 * Wrapper for arcgis api
 */
var rq = require('./request/index')
var uniq = require('./lib/uniq')

import user from './user/index'
import organization from './org/index'
import group from './group/index'
import item from './item/index'
import billing from './billing/index'

var Client = {
  search: function (string) {console.log(`search for ${string}`)},
  user: user,
  organization: organization,
  group: group,
  item: item,
  usage: {
    // get: require('./usage/usage'),
    // summary: require('./usage/get-summary'),
    // stypeToService: require('./usage/stype-to-service'),
    // parseProduct: require('./usage/parse-product'),
    // flatten: require('./usage/flatten-data'),
    // periodToMs: require('./usage/period-to-ms')
  },
  billing: billing
}

/**
 * Sets up a new arcgis client
 * @param {Object} Auth object with token, domain, username and password. Use as needed.
 * @returns {Object} Object with methods for necessary routes
 */
let client = ({token = "", domain = "www.arcgis.com", username = null, password = null, referer = null, enterpriseCreditials = false} = {}) => {
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
    console.log(`call with the token ${form.token}`)
    if (post) {
      return rq.post(`${rootUrl}${url}`, form)
    } else {
      return rq.get(`${rootUrl}${url}`, form)
    }
  },
  arcgis.generateToken = (options) => {
    return arcgis.request('/generateToken', options, true)
  }
  /* If the client hasn't been set up with a Token, and there is everything we need for a token, get that */
  if (!token && username && password && referer) {
    var options = {
      username: username,
      password: password,
      referer: referer,
      expiration: 22500
    }
    arcgis.request('/generateToken', options, true)
    .then(function (results) {
      return token = results.token
    })
  }

  return arcgis
}

module.exports = client