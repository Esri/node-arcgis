/**
 * Wrapper for arcgis api
 */
var rq = require('./request/index')
var uniq = require('./lib/uniq')

import user from './user/index'
import organization from './org/index'
import group from './group/index'
import item from './item/index'
import usage from './usage/index'

var Client = {
  search: function (queryString = '\"\"', num = 100, page = 0, sort = 'created', order = 'desc') {
    var startNum = num * page + 1
    return this.request(`search`, {'q': queryString, 'num': num, start: startNum, sortField: sort, sortOrder: order} )
    .then(function (results) {
      results.currentPage = page
      results.pages = Math.ceil(results.total / num)
      return results
    })
  },
  user: user,
  organization: organization,
  group: group,
  item: item,
  usage: usage
}

/**
 * Sets up a new arcgis client
 * @param {Object} Auth object with token, domain, username and password. Use as needed.
 * @returns {Object} Object with methods for necessary routes
 */
let client = ({token = "", domain = "www.arcgis.com", username = null, password = null, enterpriseCreditials = false} = {}) => {
  var arcgis = Object.create(Client)
  console.log(token)
  /* Automatically add client id, base url */
  /**
   * Sets ups base request to ArcGIS
   * @param {String} URL to append to root URL
   * @param {Object} Options to pass as query parameters
   * @returns {Promise} On resolution will return results
   */
  arcgis.request = ({url = '/', form = {}, post = false, rootUrl = `https://${domain}/sharing/rest/` } = {}, cb) => {
    if (!form.public){
      form.token = token
    }
    form.f     = 'pjson'
    cb ? console.log(cb) : console.log('return promise')
    if (cb) {
      if (post) {
        rq.post(`${rootUrl}${url}`, form).then(cb)
      } else {
        rq.get(`${rootUrl}${url}`, form).then(cb)
      }
    }
    if (post) {
      return rq.post(`${rootUrl}${url}`, form)
    } else {
      return rq.get(`${rootUrl}${url}`, form)
    }
  }
  return arcgis
}

module.exports = client