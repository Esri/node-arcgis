import checkError from '../check-error.js'
import end from '../lib/end'

export default function (groupId, cb) {
  var groupMethods = {
    get: get,
    /**
     * Gets items contained in a group
     * @returns {Promise} On resolution will return an object of the groups content.
     */
    content: function ({num = 100, page = 0, sort = 'created', order = 'desc'} = {}, cb) {
      return end(this.search({
        queryString: `\"\" group:${groupId}`,
        page: page,
        sort: sort,
        order: order
      }), cb)
    },
    /** Update Group
    * Modifies properties such as the group title, tags, description, sort field and order, and member sharing capabilities.
    * @param {Object} Object of attributes to change and their new values
    * @returns {Promise} Resolves to the updated group object
    */
    update: function(options, cb) {
      var group = this
      var updatePromise = this.request({
        url: `community/groups/${groupId}/update`,
        form: options,
        post: true
      })
      .then(function(confirmation) {
        return group.get(groupId)
      })

      return end(updatePromise, cb)
    },
    /**
    * Gets the users within the group
    * @returns {Promise} On resolution, returns an object with arrays of uses by role. Keys include 'admins', 'users', and a single 'Owner' username string
    */
    members: function ({num = 100, page = 0, sort = 'created', order = 'desc'} = {}, cb) {
      return end(this.request({
        url: `community/groups/${groupId}/users`,
        form: {
          num: num,
          page: page,
          sort: sort,
          order: order
        }
      }), cb)
    },
    /**
    * Adds users from the group directly
    * @param {Object} users: array of usernames, role: group_member/group_admin
    * @returns {Promise} On resolution, returns a status message with the results from the invitation.
    */
    addUsers: function(users = [], cb) {
      return end(this.request({
        url: `community/groups/${groupId}/addUsers`,
        form: {users: users},
        post: true
      }), cb)
    },
    /**
    * Removes users from the group
    * @param {Array} Array of usernames to remove from the group
    * @returns {Promise} On resolution, returns an object with arrays of uses by role. Keys include 'admins', 'users', and a single 'Owner' username string
    */
    removeUsers: function(users = [], cb) {
      return end(this.request({
        url: `community/groups/${groupId}/removeUsers`,
        form: {users: users},
        post: true
      }), cb)
    },
    /**
    * Invites users from the group via email
    * @param {Object} users: array of usernames, role: group_member/group_admin
    * @returns {Promise} On resolution, returns a status message with the results from the invitation.
    */
    inviteUsers: function({users = [], role = 'group_member', expiration = 1440,} = {}, cb) {
      var options = {
        users: users,
        role: role,
        expiration: expiration
      }
      return end(this.request({
        url: `community/groups/${groupId}/invite`,
        form: options,
        post: true
      }), cb)
    },
    /**
    * Requests access to group from currently authenticated user.
    * @returns {Promise} On resolution, returns a status message with the results from the invitation.
    */
    join: function() {
      return this.request(`community/groups/${groupId}/join`, {}, true)
      .then(function (results) {
        checkError(results)
        console.log(results)
        return results
      })
    },
    /**
    * Leaves a group.
    * @returns {Promise} On resolution, returns a status message with the results from the invitation.
    */
    leave: function() {
      return this.request(`community/groups/${groupId}/leave`, {}, true)
      .then(function (results) {
        checkError(results)
        console.log(results)
        return results
      })
    },
   /**
    * Changes of owner of group.
    * @param {Object} users: array of usernames, role: group_member/group_admin
    * @returns {Promise} On resolution, returns the updated group object
    */
    changeOwner: function(username) {
      var group = this
      var options = {
        targetUsername: username
      }
      return this.request(`community/groups/${groupId}/reassign`, options, true)
      .then(function (results) {
        checkError(results)
        console.log(results)
        group.get()
      })
    },
    delete: function() {
      return this.request(`community/groups/${groupId}/delete`, {}, true)
      .then(function (results) {
        checkError(results)
        console.log(results)
        return results
      })
    },
    request: this.request,
    search: this.search
  }


  /**
   * Gets group profile object
   * @returns {Promise} User profile object.
   */
  function get (groupId, cb) {
    var getPromise = _request({
        url: `community/groups/${groupId}`
      })
      .then(function (group) {
        return Object.assign(group, groupMethods)
      })
    return end(getPromise, cb)
  }

  var _request = this.request
  return end(get(groupId), cb)
}