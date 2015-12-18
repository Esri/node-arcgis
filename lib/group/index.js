import checkError from '../check-error.js'


export default function (groupId) {
  var Group = {
    /**
     * Gets group profile object
     * @returns {Promise} User profile object.
     */
    get: function () {
      return this.request(`community/groups/${groupId}`)
      .then(function (results){
        checkError(results)
        console.log(results)
        return results
      })
    },
    /**
     * Gets items contained in a group
     * @returns {Promise} On resolution will return an object of the groups content.
     */
    content: function (num = 100) {
      return this.request(`search`, {'q': '\"\" group:' + groupId, 'num': num})
      .then(function (results){
        checkError(results)
        console.log(results)
        return results
      })
    },
    /** Update Group
    * Modifies properties such as the group title, tags, description, sort field and order, and member sharing capabilities.
    * @param {Object} Object of attributes to change and their new values
    * @returns {Promise} Resolves to the updated group object
    */
    update: function(options = {}) {
      var group = this
      return this.request(`community/groups/${groupId}/update`, options, true)
      .then(function(results) {
        checkError(results)
        console.log(results)
        return group.get()
      })
    },
    /**
    * Gets the users within the group
    * @returns {Promise} On resolution, returns an object with arrays of uses by role. Keys include 'admins', 'users', and a single 'Owner' username string
    */
    users: function() {
      return this.request(`community/groups/${groupId}/users`)
      .then(function(results) {
        checkError(results)
        console.log(results)
        return results
      })
    },
    removeUser: function() {console.log(`kick user out of group ${groupId}`)},
    join: function() {console.log(`request to join group ${groupId}`)},
    leave: function() {console.log(`leave group ${groupId}`)},
    changeOwner: function() {console.log(`change owner of group ${groupId}`)},
    delete: function() {console.log(`delete group ${groupId}`)},
    request: this.request
  }
  if (groupId) {
    var group = Object.create(Group)
    group.id = groupId
  } else {
    var group = Object.create({
      /**
       * Creates a new group
       * @param {Object} Group options
       * @returns {Promise} On resolution will return the group object.
       */
      create: function (options) {
        if (options.tags) {
          options.tags = options.tags.join(', ')
        }
        if (!options.access) {
          options.access = 'private'
        }

        console.log(`create a new group called ${options.title}`)
        console.log(options)

        return this.request(`community/createGroup`, options, true)
        .then(function (results){
          console.log(results.group.id)
          return this.get(results.group.id)
        })
      },
      request: this.request
    })
  }
  return group
}