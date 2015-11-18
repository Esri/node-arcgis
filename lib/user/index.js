export default function (username) {
  var User = {
    /**
    * Gets user profile object
    * @returns {Promise} User profile object.
    */
    get: function () {
      return this.request(`community/users/${username}`)
      .then(function (results){
        return results
      })
    },
    /**
    * Update the user object.
    * @param {Object} Options to update on the user
    * @returns {Promise} Updated user object.
    */
    update: function (options) {
      var _user = this
      return this.request(`community/users/${username}/update`, options, true)
      .then(function (results){
        console.log(results)
        if (results.success) {
          return _user.get()
        } else {
          return new Error(results.error)
        }
      })
    },
    delete: function () {
      console.log('delete this user plz')
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
    enabled: function () {
      console.log('this user is enabled or disabled or something')
    },
    request: this.request,
    group: this.group
  }
  if (username) {
    var user = Object.create(User)
    user.username = username
  } else {
    var user = Object.create({
      create: function(options) {
        console.log('create a new user plz')
      },
      request: this.request
    })
  }
  return user
}