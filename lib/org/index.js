var sanitizeHtml = require('sanitize-html')
import end from ('../lib/end')

export default function (orgId = 'self', cb) {
  var organizationMethods = {
    /**
     * Gets items owned by an organization by organization ID or urlKey.
     * @param {Object} Object to with key-value pairs to update in the org.
     * @returns {Promise} Returns the updated org object.
     */
    update: function(options) {
      var _org = this
      console.log('update org plz', options)
      return this.request(`portals/${orgId}/update`, options, true)
      .then(function(results) {
        return _org.get()
      })
    },
    /**
     * Gets items owned by an organization by organization ID or urlKey.
     * @param {String} Organization ID or unique urlKey
     * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    content: function (num = 100, page = 0) {
      return this.search(`\"\" accountid:${orgId}`, num, page)
    },
    /**
     * Gets users in an orgnaization
     * @param {Number} Number of users to return per page. Max is 100. Default is 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    members: function (num = 100) {
      return this.request(`portals/self/users`, {"num": num})
      .then(function (results){
        console.log(results)
        return results
      })
    },

    featured: function() {
      console.log('get feartued content plz')
      var _org = this
      return _org.get()
      .then(function (results) {
        var featuredGroupId = results.homePageFeaturedContent.split(':')[1]
        var featuredGroup = _org.group(featuredGroupId)
        return featuredGroup.content()
      })
    },
    request: this.request,
    search: this.search,
    group: this.group
  }

  /**
   * Gets organization by ID, or urlKey.
   * @returns {Promise} On resolution will return Organization Object
   */
  function get (orgId) {
    return _request({url: `portals/${orgId}`})
    .then(function (org) {
      org.description = sanitizeHtml(org.description)
      return org
    })
  }
  /**
   * Gets summary of an orgnaization by ID or urlKey.
   * @returns {Promise} On resolution will return a string of the Organization summary.
   */
  function summary (orgId) {
    return _request({url: `portals/${orgId}/resources/localizedOrgProperties`})
    .then(function (results){
      return results.default.description
    })
  }
  // var org = Object.create(Org)
  // org.id = orgId
  var _request = this.request
  var orgPromise = get(orgId)
  .then(function (organization) {
    return Object.assign(organization, organizationMethods)
  })

  return end(orgPromise, cb)
}