import checkError from '../check-error.js'

export default function (itemId) {
  var Item = {
    /**
    * Gets current username
    * @returns {Promise} On resolution will return current users name. You need that.
    */
    getUsername: function() {
      return this.request(`portals/self`)
      .then(function (results) {
        return results.user.username
      })
    },
    /**
    * Creats a rando id for publishing items, which need to be at a unique url endpoint.
    * @returns {String} A rando UUID that uses _ instead of - because of reasons
    */
    generateUUID: function() {
      var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();; //use high-precision timer if available
      }
      var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    },

    /**
    * Gets an item
    * @returns {Promise} On resolution will return Item Object
    */
    get: function() {
      var item = this
      // Step One:
      // Promise.all to return:
      //  - Fav GroupID
      //  - All Groups item is in
      //  - Item Details
      return Promise.all([
        item.request(`portals/self`).then(function (results) {
          checkError(results)
          return results.user.favGroupId
        }),
        item.groups(),
        item.request(`content/items/${itemId}`),
      ])
      .catch(function (err) {
        console.error(err)
      })
      .then(function (results) {
        checkError(results)
        // Step Two:
        //  - Add all groups to item.groups = []
        var itemDetails = results[2]
        //  - Add all groups to item.groups = []
        itemDetails.groups = results [1]
        //  - Is Fav Group ID in the All Groups List? item.favorite = bool
        var groupIds = itemDetails.groups.map(function(object) {
          return object.id
        })
        itemDetails.favorite = groupIds.indexOf(results[0]) > -1
        // Step Three:
        //  - Return the item details with new information.
        console.log(itemDetails)
        return itemDetails
      })
    },
    /**
    * Updates the Item Details Stuff
    * @param {Object} Key value pair of the stuff that needs to be updated.
    * @returns {Promise} On resolution will return the new item object, with the stuff and things updated.
    */
    update: function(options) {
      var item = this
      item.getUsername()
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
    duplicate: function(options = {}) {
      console.log(options)
      var item = this
      item.getUsername()
      .then(function (username) {
        item.get(item)
        .then(function (results) {
          // This could probably be less gross and weird
          options.url = results.url
          options.type = results.type
          options.title = options.title ? options.title : `${results.title} Copy`
          options.description = options.description ? options.description : results.description
          options.tags = options.tags ? options.tags : results.tags
          options.snippet = options.snippet ? options.snippet : results.snippet
          // console.log(options)
          // var options = Object.assign(options, results)
          console.log(options)
          return item.request(`content/users/${username}/addItem`, options, true)
        })
        .then(function (results) {
          console.log(results)
          var newItem = item.newInstance(results.id)
          return newItem.get()
        })
      })
    },
    createService: function() {console.log(itemId)},
    /**
    * Move item to a folder
    * @params {String} Target Folder ID.
    * @returns {Promise} Returns the content of the folder you just moved the item too
    */
    folder: function(folderId) {
      var item = this
      var options = {
        folder: folderId,
        items: itemId
      }
      var username
     return this.request(`portals/self`)
      .then(function (results) {
        username = results.user.username
        return results.user.username
      })
      .then(function (username){
        console.log(username, itemId, options)
        return item.request(`content/users/${username}/moveItems`, options, true)
      })
      .then(function (results) {
        console.log(results)
        if (results.error) {
          console.log(results)
          return results
        } else {
          console.log(username)
          return item.request(`content/users/${username}/${folderId}`)
        }
      })
      .then(function (results) {
        console.log(results)
        return results
      })
    },
    /**
    * Item groups
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
    /**
    * Change Owner
    * Changes the owner of an item. Depending on user roles and sharing permissions,
    * this may remove the item from the current users access.
    * @params {String} New owner's user ID
    * @returns {Promise} Resolves to the updated item if you still have access. Will resolve to a generic success method if not.
    */
    changeOwner: function(username) {
      var item = this
      var options = {
        targetUsername: username
      }
      item.getUsername()
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
    /** Publish item
    * Publish an existing item with geographic data as a feature layer ready to add to maps and stuff.
    * @params {Object} You might need some config options maybe?
    * @returns {Promise} Promise that resolves to the newly created item.
    */
    publish: function(options = {}) {
      var item = this

      var publishOptions = {
        itemID: itemId,
        publishParameters: {
          name: item.generateUUID(),
          description: options.description,
          hasStaticData: false,
          maxRecordCount: -1,
          layerInfo: {
            capabilities: "Query, Editing"
          }
        }
      }
      return item.get(item)
      .then(function(results) {
        console.log(results)
        publishOptions.fileType = results.type
        return item.getUsername()
      })
      .then(function (username) {
        console.log(publishOptions)
        publishOptions.publishParameters = JSON.stringify(publishOptions.publishParameters)
        return item.request(`content/users/${username}/publish`, publishOptions, true)
        .then(function (results) {
          console.log(results)
          return results.item
        })
      })
    },
    /** Export Item
    * The opposite of publish() - takes a feature layer item and turns it into geographic data that can be downloaded and taken elsewhere.
    * @params {String} data format to convert to. Shapefile | CSV | File Geodatabase | Feature Collection | GeoJSON
    * @returns {Promise} Resolves to a job ticket that can used to check item.status({jobtype: 'export', job_id: jobId})
    */
    export: function(format) {
      var item = this
      var exportOptions = {
        itemId: itemId,
        exportFormat: format
      }
      item.getUsername()
      .then(function (username) {
        return item.request(`content/users/${username}/export`, exportOptions, true)
      })
      .then(function (results) {
        console.log(results)
        return results
      })
    },
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
    /**
    * Sets delete protection on an item
    * @params {Boolean}
    * @returns {Promise} Returns the updated item.
    */
    deleteProtected: function(boolean) {
      var item = this
      item.getUsername()
      .then(function (username) {
        if (boolean == true) {
          return item.request(`content/users/${username}/items/${itemId}/protect`, {}, true)
          .then(function (results) {
            return item.get(item)
          })
        } else if (boolean == false) {
          return item.request(`content/users/${username}/items/${itemId}/unprotect`, {}, true)
          .then(function (results) {
            return item.get(item)
          })
        } else {
          return item.get(item)
          .then(function(results) {
            return results.protected
          })
        }
      })
    },
    /** Registers an application with ArcGIS to enable oAuth methods.
    * @returns {Promise} Resolves to the newly created item oAuth information.
    */
    register: function() {
      var item = this
      var options = {
        itemId: itemId,
        appType: 'multiple',
        redirect_uris: []
      }
      return item.request(`oauth2/registerApp`, options, true)
      .then(function (results) {

        return item.getOAuth()
      })
    },
    /** Get oAuth information for a registered app
    * Returns such handy things as app certs, app type, client ID and secret, and redirects
    * @returns {Promise} Resolves to JSON object of app auth things.
    */
    getOAuth: function() {
      var item = this
      item.getUsername()
      .then(function (username) {
        return item.request(`content/users/${username}/items/${itemId}/registeredAppInfo`)
      })
    },
    /** Gets a token from a registed app.
    * @params {Number} Token validity duration
    * @returns {Promise} Resolves to an object with an access token and expiry date.
    client_id:'LzNuD2YFMvWENXid', client_secret:'6270855046e848619ee65d77d3180b15', grant_type:'client_credentials', expiration: 1440
    */
    getToken: function(duration) {
      var item = this
      var expiresIn = duration ? duration : 1440
      return item.getOAuth()
      .then(function (results){
        console.log(results)
        var tokenOptions = {
          client_id: results.client_id,
          client_secret: results.client_secret,
          grant_type: 'client_credentials',
          expiration: expiresIn
        }
        return item.request(`oauth2/token`, tokenOptions, true)
      })
    },
    /** Gets usage for the item
    * @returns {Promise} resolves to a json object of weird, cryptic item usage garbage.
    */
    usage: function (options = {}) {
      var _item = this
      return this.get()
      .then(function (results) {
        return results.name
      })
      .then(function (name) {
        options.name = name
        return _item._usage(options).get()
      })
      .then(function (results) {
        checkError(results)
        return results
      })
    },
    /** Gets related items
    * @returns {Promise} resolves to a json object of weird, cryptic item relationships.
    */
    relatedItems: function() {
      var item = this
      var relationshipTypes = [
        'Map2Service',
        'WMA2Code',
        'Map2FeatureCollection',
        'MobileApp2Code',
        'Service2Data',
        'Service2Service',
        'Map2AppConfig',
        'Item2Attachment',
        'Item2Report',
        'Listed2Provisioned'
      ]
      var getAllRelationships = []
      var parseSet = function (set, rType, direction) {
        set.relationship = rType
        set.direction = direction
        return set
      }
      relationshipTypes.forEach(function (rType) {
        getAllRelationships.push(
          item.request(`content/items/${itemId}/relatedItems`, {
            relationshipType: rType, direction: 'forward'
          })
          .then(function(set){return parseSet(set, rType, 'forward')})
        )
        getAllRelationships.push(
          item.request(`content/items/${itemId}/relatedItems`, {
            relationshipType: rType, direction: 'reverse'
          })
          .then(function(set){return parseSet(set, rType, 'reverse')})
        )
      })
      return Promise.all(getAllRelationships)
      .then(function (results) {
        var items = []
        results.forEach(function(set) {
          console.log(set)
          if (set.relatedItems.length > 0) {
            items[set.relationship] = {}
            items[set.relationship][set.direction] = set.relatedItems
          }
        })
        console.log(items)
        return items
      })
    },
    /** Item Permissions / Sharing
    * Permissions are who has access to the item. They are rolled in to sharing workflows usually.
    * @params {Object} {access: 'string' // public/organization/private, groups: [groupid, groupid]}
    * @returns {Promise} Resolves to updated item properties.
    */
    permissions: function(options) {
      var item = this
      var permissions = {
        everyone: options.access == 'public' ? true : false,
        org: options.access == 'org' ? true : false,
        groups: options.groups
      }
      console.log(permissions)
      return item.request(`content/items/${itemId}/share`, permissions, true)
      .then(function (results) {
        return item.get(item)
      })
    },
    delete: function() {
      var item = this
      item.getUsername()
      .then(function (username) {
        return item.request(`content/users/${username}/items/${itemId}/delete`, {}, true)
        .then(function (results) {
          console.log(results)
        })
      })
    },
    search: this.search,
    request: this.request,
    _usage: this.usage,
    newInstance: this.item
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
      create: function() {console.log('make me a new item plz')},
      request: this.request
    })
  }
  return item
}
