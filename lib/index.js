/**
 * Wrapper for arcgis api
 */
var rq = require('./request/index')
var uniq = require('./lib/uniq')
import end from './lib/end'

import user from './user/index'
import Organization from './org/index'
import Group from './group/index'
import item from './item/index'
import usage from './usage/index'


var Client = {
  search: function ({queryString = '\"\"', num = 100, page = 0, sort = 'created', order = 'desc'} = {}, cb) {
    var startNum = num * page + 1
    var searchPromise = this.request({
        url: `search`,
        form: {'q': queryString, 'num': num, start: startNum, sortField: sort, sortOrder: order}
      })
      .then(function (results) {
        results.currentPage = page
        results.pages = Math.ceil(results.total / num)
        return results
      })
    return end(searchPromise, cb)
  },
  user: user,
  organization: organization,
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
  arcgis.group = Group(arcgis)
  arcgis.organization = Organization(arcgis)
  return arcgis
}

module.exports = client