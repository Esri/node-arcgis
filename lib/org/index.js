var sanitizeHtml = require('sanitize-html')

export default function (orgId = 'self') {
  var Org = {
    /**
     * Gets organization by ID, or urlKey.
     * @returns {Promise} On resolution will return Organization Object
     */
    get: function() {
      var getSummary = this.summary
      return this.request(`portals/${orgId}`)
      .then(function (org) {
        org.description = sanitizeHtml(org.description)
        console.log(org)
        return org
      })
    },
    /**
     * Gets summary of an orgnaization by ID or urlKey.
     * @returns {Promise} On resolution will return a string of the Organization summary.
     */
    summary: function () {
      return this.request(`portals/self/resources/localizedOrgProperties`)
      .then(function (results){
        console.log(results)
        return results.default.description
      })
    },
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
      .then(function (results){
        console.log(results)
        return results
      })
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
  var org = Object.create(Org)
  org.id = orgId
  return org
}