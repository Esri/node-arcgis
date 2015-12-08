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
    * @returns {Promise} Something? not sure.
    */
    favorite: function() {
      var item = this
      return this.request(`portals/self`)
      .then(function (results) {
        console.log(results.user.favGroupId)
        return results.user.favGroupId
      })
      .then(function (favGroupId) {
        var options = {
          items: itemId,
          groups: favGroupId
        }
        return item.request(`content/items/${itemId}/share`, options, true)
      })
    },
    duplicate: function() {console.log(itemId)},
    createService: function() {console.log(itemId)},
    folder: function() {console.log(itemId)},
    groups: function() {console.log(itemId)},
    owner: function() {console.log(itemId)},
    publish: function() {console.log(itemId)},
    export: function() {console.log(itemId)},
    data: function() {console.log(itemId)},
    deleteProtected: function() {console.log(itemId)},
    register: function() {console.log(itemId)},
    oAuth: function() {console.log(itemId)},
    relatedItems: function() {console.log(itemId)},
    permissions: function() {console.log(itemId)},
    delete: function() {console.log(itemId)},
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
