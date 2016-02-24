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
      return this.request({
        url: `portals/${this.id}/update`,
        form: options,
        post: true
      })
      .then(function(results) {
        return this.get(this.id)
      })
    },
    /**
     * Gets items owned by an organization by organization ID or urlKey.
     * @param {String} Organization ID or unique urlKey
     * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    content: function ({num = 100, page = 0, sort = 'created', order = 'desc'} = {}, cb) {
      return end(this.search({
        queryString: `\"\" accountid:${this.id}`,
        page: page,
        sort: sort,
        order: order
      }), cb)
    },
    /**
     * Gets users in an orgnaization
     * @param {Number} Number of users to return per page. Max is 100. Default is 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    members: function ({num = 100, page = 0, sort = 'created', order = 'desc'} = {}, cb) {
      return end(this.request({
        url: `portals/self/users`, form: {"num": num}
      }), cb)
    },

    featured: function() {
      return this.get(this.id)
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
  function get (orgId, cb) {
    var getPromise = _request({url: `portals/${orgId}`})
    .then(function (organization) {
      organization.description = sanitizeHtml(organization.description)
      return Object.assign(organization, organizationMethods)
    })
    return end(getPromise, cb)
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
  return end(get(orgId), cb)
}