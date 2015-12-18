import checkError from '../check-error.js'

export default function (username) {
  var User = {
    /**
    * Gets user profile object
    * @returns {Promise} User profile object.
    */
    get: function () {
      return this.request(`community/users/${username}`)
      .then(function (results){
        console.log(results)
        return results
      })
    },
    /**
    * Update the user object.
    * @param {Object} Options to update on the user
    * @returns {Promise} Updated user object.
    */
    update: function (options) {
      var user = this
      return this.request(`community/users/${username}/update`, options, true)
      .then(function (results){
        checkError(results)
        return user.get()
      })
    },
    /**
    * Deletes the user
    * @returns {Promise} Delete confirmation.
    */
    delete: function () {
      console.log('delete this user plz')
      return this.request(`community/users/${username}/delete`, {}, true)
    },
    /**
    * Gets items owned by a user.
    * @param {String} Folder id desired
    * @returns {Promise} On resolution will return an object of the users content.
    */
    content: function (folder = '') {
      return this.request(`content/users/${username}/${folder}`)
      .then(function (results){
        console.log(results)
        return results
      })
    },
    /**
    * Gets items a user has favorited.
    * @returns {Promise} On resolution will return an object of all the users favorite content.
    */
    favorites: function () {
      return this.get()
      .then(user => {
        console.log(user.favGroupId)
        let favoriteGroup = this.group(user.favGroupId)
        return favoriteGroup.content()
      })
      .then(function (results) {
        console.log(results)
        return results
      })
    },
    /**
    * Gets all tags and their counts that have been used by the user.
    * @returns {Promise} On resolution will return an object of the users tags.
    */
    tags: function () {
      return this.request(`community/users/${username}/tags`)
      .then(function (results){
        console.log(results)
        return results
      })
    },
    /**
    * Returns the users status as enabled or disabled, and sets the users status.
    * @params {Boolean} If true, enables user. If false, disables user. If not provided, returns the users enabled status
    * @returns {Promise} On resolution will return
    */
    enabled: function (bool) {
      var postObj = {}
      if (bool == false) {
        console.log('disable this user')
        return this.request(`community/users/${username}/disable`, postObj, true)
      } else if (bool == true) {
        console.log('enable this user')
        return this.request(`community/users/${username}/enable`, postObj, true)
      } else {
        return this.request(`community/users/${username}`)
        .then(function (results){
          console.log (results.mfaEnabled)
          return results.mfaEnabled
        })
      }
    },
    request: this.request,
    group: this.group
  }
  if (username) {
    var user = Object.create(User)
    user.username = username
  } else {
    var user = Object.create({
      /**
       * Creates a new invitation, which is emailed to a user.
       * @param {Object} New User options
       * @returns {Promise} On resolution will return the user invitation object.
       */
      create: function (options) {
        console.log(`create a new user`)
        console.log(options)

        // check username
        // community/checkUsernames
          // POST params
          // usernames:nikolaswise_agotest2_esripdx

        options.invitationList = {
          invitations: options.invitations
        }
        delete options.invitations

        return this.arcgis.request(`portals/self/invite`, options, true)
        .then( function (results) {
          console.log(results)
          return results
        })
      },
      request: this.request
    })
  }
  return user
}