import checkError from '../check-error.js'

export default function (username) {
  var User = {
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


  /**
  * Gets user profile object
  * @returns {Promise} User profile object.
  */
  function get (username) {
    return this.request(`community/users/${username}`)
    .then(function (results){
      console.log(results)
      return results
    })
  }


}