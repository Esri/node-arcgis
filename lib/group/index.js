export default function (groupId) {
  var Group = {
    /**
     * Gets group profile object
     * @returns {Promise} User profile object.
     */
    get: function () {
      return this.request(`community/groups/${groupId}`)
      .then(function (results){
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
        console.log(results)
        return results
      })
    },
    update: function() {console.log(`update group ${groupId} information`)},
    delete: function() {console.log(`delete group ${groupId}`)},
    users: function() {console.log(`get users in group ${groupId}`)},
    removeUser: function() {console.log(`kick user out of group ${groupId}`)},
    join: function() {console.log(`request to join group ${groupId}`)},
    leave: function() {console.log(`leave group ${groupId}`)},
    changeOwner: function() {console.log(`change owner of group ${groupId}`)},
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