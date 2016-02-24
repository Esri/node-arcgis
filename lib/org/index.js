var sanitizeHtml = require('sanitize-html')
var end = require('../lib/end')


export default function (orgId = 'self', cb) {
  var organizationMethods = {
    get: get,
    /**
     * Gets items owned by an organization by organization ID or urlKey.
     * @param {Object} Object to with key-value pairs to update in the org.
     * @returns {Promise} Returns the updated org object.
     */
    update: function(options) {
      var _org = this
      return this.request({
        url: `portals/${_org.id}/update`,
        form: options,
        post: true
      })
      .then(function(results) {
        return _org.get(_org.id)
      })
    },
    /**
     * Gets items owned by an organization by organization ID or urlKey.
     * @param {String} Organization ID or unique urlKey
     * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    content: function (num = 100, page = 0) {
      return this.search(`\"\" accountid:${_org.id}`, num, page)
    },
    /**
     * Gets users in an orgnaization
     * @param {Number} Number of users to return per page. Max is 100. Default is 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    members: function (num = 100) {
      return this.request(`portals/self/users`, {"num": num})
      .then(function (results){

        return results
      })
    },

    featured: function() {
      var _org = this
      return _org.get(_org.id)
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
    .then(function (organization) {
      organization.description = sanitizeHtml(organization.description)

      return Object.assign(organization, organizationMethods)
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

  var _request = this.request

  var orgPromise = get(orgId)
  .then(function (organization) {
    return organization
  })

  return end(orgPromise, cb)
}