export default function (itemId) {
  var Item = {
    /**
    * Gets an item
    * @returns {Promise} On resolution will return Item Object
    */
    get: function() {
      return this.request(`content/items/${itemId}`)
      .then(function (results) {
        console.log(results)
        // Need to check if an item has been favorited by the user here
        return results
      })
    },
    /**
    * Updates the Item Details Stuff
    * @param {Object} Key value pair of the stuff that needs to be updated.
    * @returns {Promise} On resolution will return the new item object, with the stuff and things updated.
    */
    update: function(options) {
      var item = this
      console.log(options)
      return this.request(`portals/self`)
      .then(function (results) {
        return results.user.username
      })
      .then(function (username) {
        return item.request(`content/users/${username}/items/${itemId}/update`, options, true)
        .then(function (results) {
          return item.get(item)
        })
      })
    },
    /**
    * Rates an Item
    * @param {Number} An integer between 0 and 5. Pass a value of 'null' to delete the authenticated users rating.
    * @returns {Promise} On resolution will return the new item object, with the rating updated.
    */
    rate: function(rating) {
      var endpoint
      var item = this
      if (rating == null) {
        endpoint = `content/items/${this.id}/deleteRating`
      } else {
        endpoint = `content/items/${this.id}/addRating`
      }
      return item.request(endpoint, {'rating': rating}, true)
      .then( function(results){
        return item.get(item)
      })
    },
    /**
    * Favorite an Item
    * Adds the item to the users favorite items group.
    * @params {Boolean}
    * @returns {Promise} If true, will add item to favorites. If false, will unfavorite.
    */
    favorite: function(boolean) {
      var item = this
      // get self
      return this.request(`portals/self`)
      // get user favorite group id
      .then(function (results) {
        console.log(results.user.favGroupId)
        return results.user.favGroupId
      })
      // construct share post data
      .then(function (favGroupId) {
        var options = {
          items: itemId,
          groups: favGroupId
        }
        if (boolean == true) {
          return item.request(`content/items/${itemId}/share`, options, true)
        } else if (boolean == false) {
          return item.request(`content/items/${itemId}/unshare`, options, true)
        }
      })
    },
    duplicate: function() {console.log(itemId)},
    createService: function() {console.log(itemId)},
    /**
    * Move item to a folder
    * @params {String} Target Folder ID.
    * @returns {Promise} Returns the content of the folder you just moved the item too
    */
    folder: function(folderId) {
      var item = this
      var options = {
        folder: folderId
      }
     return this.request(`portals/self`)
      .then(function (results) {
        return results.user.username
      })
      .then(function (username){
        console.log(username, itemId)
        return item.request(`content/users/${username}/items/${itemId}/move`, options, true)
      })
      .then(function (results) {
        console.log(results)
        if (results.error) {
          console.log(results)
          return results
        } else {
          return item.request(`content/users/${results.owner}/${results.folder}`)
        }
      })
      .then(function (results) {
        console.log(results)
        return results
      })
    },
    /**
    * Favorite an Item
    * Lists the groups of which the item is a part. Only shows the groups that the calling user can access.
    * @returns {Promise} Resolves to Array of group objects.
    */
    groups: function() {
      return item.request(`content/items/${itemId}/groups`)
      .then(function (results) {
        var itemGroups = []
          .concat(results.admin)
          .concat(results.member)
          .concat(results.other)
        return itemGroups
      })
    },
    changeOwner: function(username) {
      var item = this
      var options = {
        targetUsername: username
      }
      return this.request(`portals/self`)
      .then(function (results) {
        return results.user.username
      })
      .then(function (username) {
        return item.request(`content/users/${username}/items/${itemId}/reassign`, options, true)
        .then(function (results) {
          if (results.error) {
            return results
          } else {
            return item.get(item)
          }
        })
      })
    },
    publish: function() {console.log(itemId)},
    export: function() {console.log(itemId)},
    /**
    * Downloads an items data from the server
    * @returns {Promise} Resolves a data stream to the client, presumable. Right now it redirects to amazon s3 and chokes.
    */
    download: function() {
      return item.request(`content/items/${itemId}/data`)
      .then(function (results) {
        console.log(results)
        return results
      })
    },
    deleteProtected: function() {console.log(itemId)},
    register: function() {console.log(itemId)},
    oAuth: function() {console.log(itemId)},
    relatedItems: function() {console.log(itemId)},
    permissions: function() {console.log(itemId)},
    delete: function() {console.log(itemId)},
    search: this.search,
    request: this.request
  }
  if (itemId) {
    var item = Object.create(Item)
    item.id = itemId
  } else {
    var item = Object.create({
    /**
    * Creates a New item
    * @params {Object} New item options
    * @returns {Promise} On resolution will return Item Object
    */
      new: function() {console.log('make me a new item plz')},
      request: this.request
    })
  }
  return item
}
