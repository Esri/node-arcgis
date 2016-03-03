/**
 * Wrapper for arcgis api
 */
var rq = require('./request/index')
var uniq = require('./lib/uniq')
import end from './lib/end'

import User from './user/index'
import Organization from './org/index'
import Group from './group/index'
import CreateGroup from './group/create'
import Item from './item/index'
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
  }
}

let client = ({token = "", domain = "www.arcgis.com", username = null, password = null, enterpriseCreditials = false} = {}) => {
  var arcgis = Object.create(Client)

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
  arcgis.user = User(arcgis)
  arcgis.organization = Organization(arcgis)
  arcgis.group = Group(arcgis)
  arcgis.group.create = CreateGroup(arcgis)
  arcgis.item = Item(arcgis)
  arcgis.application = arcgis.item
  arcgis.layer = arcgis.item
  arcgis.map = arcgis.item
  arcgis.file = arcgis.item
  return arcgis
}

module.exports = client