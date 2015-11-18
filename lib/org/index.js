var sanitizeHtml = require('sanitize-html')

export default function (orgId) {
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
    update: function(options) {
      console.log('update org plz')
    },
    /**
     * Gets items owned by an organization by organization ID or urlKey.
     * @param {String} Organization ID or unique urlKey
     * @param {Number} Number of items to return per page. Max is 100. Defaults to 100.
     * @returns {Promise} On resolution will return paginated users object.
     */
    content: function (num = 100) {
      return this.request(`search`, {'q': `\"\" accountid:${orgId}`, 'num': num} )
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
        return results.default.description
      })
    },
    featured: function() {
      console.log('get feartued content plz')
    },
    language: function() {
      console.log('get language plz')
    },
    request: this.request
  }
  var org = Object.create(Org)
  org.id = orgId
  return org
}