import checkError from '../check-error.js'
import end from '../lib/end'

/**
 * Gets group profile object
 * @returns {Promise} User profile object.
 */

export default function Group (arcgis) {
  function get (id) {
    return arcgis.request({
      url: `community/groups/${id}`
    })
  }

  return function getGroup (groupId, cb) {
    var promise = get(groupId).then(function (g) {
      g.get = get
      /**
       * Gets items contained in a group
       * @returns {Promise} On resolution will return an object of the groups content.
       */
      g.content = function ({num = 100, page = 0, sort = 'created', order = 'desc'} = {}, cb) {
        return end(arcgis.search({
          queryString: `\"\" group:${groupId}`,
          page: page,
          sort: sort,
          order: order
        }), cb)
      }
      /** Update Group
      * Modifies properties such as the group title, tags, description, sort field and order, and member sharing capabilities.
      * @param {Object} Object of attributes to change and their new values
      * @returns {Promise} Resolves to the updated group object
      */
      g.update = function(options, cb) {
        var updatePromise = arcgis.request({
          url: `community/groups/${groupId}/update`,
          form: options,
          post: true
        })
        .then(function(confirmation) {
          return arcgis.get(groupId)
        })

        return end(updatePromise, cb)
      }
      /**
      * Gets the users within the group
      * @returns {Promise} On resolution, returns an object with arrays of uses by role. Keys include 'admins', 'users', and a single 'Owner' username string
      */
      g.members = function ({num = 100, page = 0, sort = 'created', order = 'desc'} = {}, cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/users`,
          form: {
            num: num,
            page: page,
            sort: sort,
            order: order
          }
        }), cb)
      }
      /**
      * Adds users from the group directly
      * @param {Object} users: array of usernames, role: group_member/group_admin
      * @returns {Promise} On resolution, returns a status message with the results from the invitation.
      */
      g.addUsers = function(users = [], cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/addUsers`,
          form: {users: users},
          post: true
        }), cb)
      }
      /**
      * Removes users from the group
      * @param {Array} Array of usernames to remove from the group
      * @returns {Promise} On resolution, returns an object with arrays of uses by role. Keys include 'admins', 'users', and a single 'Owner' username string
      */
      g.removeUsers = function(users = [], cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/removeUsers`,
          form: {users: users},
          post: true
        }), cb)
      }
      /**
      * Invites users from the group via email
      * @param {Object} users: array of usernames, role: group_member/group_admin
      * @returns {Promise} On resolution, returns a status message with the results from the invitation.
      */
      g.inviteUsers = function({users = [], role = 'group_member', expiration = 1440,} = {}, cb) {
        var options = {
          users: users,
          role: role,
          expiration: expiration
        }
        return end(arcgis.request({
          url: `community/groups/${groupId}/invite`,
          form: options,
          post: true
        }), cb)
      }
      /**
      * Requests access to group from currently authenticated user.
      * @returns {Promise} On resolution, returns a status message with the results from the invitation.
      */
      g.join = function(cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/join`,
          form: {},
          post: true
        }), cb)
      }
      /**
      * Leaves a group.
      * @returns {Promise} On resolution, returns a status message with the results from the invitation.
      */
      g.leave = function(form = {}, cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/leave`,
          form: {},
          post: true
        }), cb)
      }
     /**
      * Changes of owner of group.
      * @param {Object} users: array of usernames, role: group_member/group_admin
      * @returns {Promise} On resolution, returns a confirmation
      */
      g.changeOwner = function(cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/reassign`,
          form: {targetUsername: username},
          post: true
        }), cb)
      }
     /**
      * Deltes group.
      * @param {Object} users: array of usernames, role: group_member/group_admin
      * @returns {Promise} On resolution, returns a confirmation
      */
      g.delete = function(cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/delete`,
          form: {},
          post: true
        }), cb)
      }

      return g
    })
    return end(promise, cb)
  }
}