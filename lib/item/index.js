var end = require('../lib/end')

export default function Organization (arcgis) {
  var get = function (id) {
    return arcgis.request({
      url: `content/items/${itemId}`
    })
  }

  var getUsername = function () {
    return arcgis..request(`portals/self`)
    .then(function (results) {
      return results.user.username
    })
  }
  var generateUUID = function () {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
      d += performance.now();; //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  return function getItem (itemId, cb) {
    var promise = get(itemId).then(function (i) {
      i.update = function (options) {
        return getUsername()
        .then(function (username) {
          return arcgis.request({
            url: `content/users/${username}/items/${itemId}/update`,
            form: options,
            post: true
          })
          .then( function (results) {
            return i.get(itemId)
          })
        })
      }
      i.permissions = function (options) {
        var permissions = {
          everyone: options.access == 'public' ? true : false,
          org: options.access == 'org' ? true : false,
          groups: options.groups
        }
        return arcgis.request({
          url: `content/items/${itemId}/share`,
          form: permissions,
          post: true
        })
        .then(function (results) {
          return o.get(itemId)
        })
      }
      i.rate = function (rating) {
        var endpoint
        if (rating == null) {
          endpoint = `content/items/${this.id}/deleteRating`
        } else {
          endpoint = `content/items/${this.id}/addRating`
        }
        return arcgis.request({
          url: endpoint,
          form: {'rating': rating},
          post: true
        })
        .then( function (results){
          return i.get(itemId)
        })
      }
      // complicated, need to do this
      i.isFavorite = function () {
        return false
      }
      i.favorite = function (boolean) {
        // get self
        return this.request(`portals/self`)
        // get user favorite group id
        .then(function (results) {
          return results.user.favGroupId
        })
        // construct share post data
        .then(function (favGroupId) {
          var options = {
            items: itemId,
            groups: favGroupId
          }
          if (boolean == true) {
            return arcgis.request({
              url: `content/items/${itemId}/share`,
              form: options,
              post: true
            })
          } else if (boolean == false) {
            return arcgis.request({
              url: `content/items/${itemId}/unshare`,
              form: options,
              post: true
            })
          }
        })
      }
      i.duplicate = function (options = {}) {
        return getUsername()
        .then(function (username) {
          i.get(itemId)
          .then(function (results) {
            // This could probably be less gross and weird
            options.url = results.url
            options.type = results.type
            options.title = options.title ? options.title : `${results.title} Copy`
            options.description = options.description ? options.description : results.description
            options.tags = options.tags ? options.tags : results.tags
            options.snippet = options.snippet ? options.snippet : results.snippet
            return arcgis.request({
              url: `content/users/${username}/addItem`,
              form: options,
              post: true
            })
          })
          // .then(function (results) {
          //   var newItem = item.newInstance(results.id)
          //   return newItem.get()
          // })
        })
      }
      i.groups = function () {
        return arcgis.request({
          url: `content/items/${itemId}/groups`
        })
        .then(function (results) {
          var itemGroups = []
            .concat(results.admin)
            .concat(results.member)
            .concat(results.other)
          return itemGroups
        })
      }
      i.changeOwner = function (username) {
        var options = {
          targetUsername: username
        }
        return getUsername()
        .then(function (username) {
          return arcgis.request({
            url: `content/users/${username}/items/${itemId}/reassign`,
            form: options,
            post: true
          })
          .then(function (results) {
            if (results.error) {
              return results
            } else {
              return i.get(itemId)
            }
          })
        })
      }
      i.relatedItems = function () {
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
            arcgis.request(`content/items/${itemId}/relatedItems`, {
              relationshipType: rType, direction: 'forward'
            })
            .then(function (set){return parseSet(set, rType, 'forward')})
          )
          getAllRelationships.push(
            arcgis.request(`content/items/${itemId}/relatedItems`, {
              relationshipType: rType, direction: 'reverse'
            })
            .then(function (set){return parseSet(set, rType, 'reverse')})
          )
        })
        return Promise.all(getAllRelationships)
        .then(function (results) {
          var items = []
          results.forEach(function (set) {
            console.log(set)
            if (set.relatedItems.length > 0) {
              items[set.relationship] = {}
              items[set.relationship][set.direction] = set.relatedItems
            }
          })
          console.log(items)
          return items
        })
      }
      i.deleteProtected = function (boolean) {
        item.getUsername()
        .then(function (username) {
          if (boolean == true) {
            return arcgis.request(`content/users/${username}/items/${itemId}/protect`, {}, true)
            .then(function (results) {
              return item.get(item)
            })
          } else if (boolean == false) {
            return arcgis.request(`content/users/${username}/items/${itemId}/unprotect`, {}, true)
            .then(function (results) {
              return item.get(item)
            })
          } else {
            return item.get(item)
            .then(function (results) {
              return results.protected
            })
          }
        })
      }
      i.delete = function () {
        item.getUsername()
        .then(function (username) {
          return arcgis.request(`content/users/${username}/items/${itemId}/delete`, {}, true)
          .then(function (results) {
            console.log(results)
          })
        })
      }
      return i
    })
    return end(promise, cb)
  }
}



// export default function (itemId) {
//   var Item = {
//     getUsername: function () {
//       return this.request(`portals/self`)
//       .then(function (results) {
//         return results.user.username
//       })
//     },
//     generateUUID: function () {
//       var d = new Date().getTime();
//       if(window.performance && typeof window.performance.now === "function"){
//         d += performance.now();; //use high-precision timer if available
//       }
//       var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         d = Math.floor(d/16);
//         return (c=='x' ? r : (r&0x3|0x8)).toString(16);
//       });
//       return uuid;
//     },

//     get: function () {//
//       // Step One:
//       // Promise.all to return:
//       //  - Fav GroupID
//       //  - All Groups item is in
//       //  - Item Details
//       return Promise.all([
//         arcgis.request(`portals/self`).then(function (results) {
//           checkError(results)
//           return results.user.favGroupId
//         }),
//         item.groups(),
//         arcgis.request(`content/items/${itemId}`),
//       ])
//       .catch(function (err) {
//         console.error(err)
//       })
//       .then(function (results) {
//         checkError(results)
//         // Step Two:
//         //  - Add all groups to item.groups = []
//         var itemDetails = results[2]
//         //  - Add all groups to item.groups = []
//         itemDetails.groups = results [1]
//         //  - Is Fav Group ID in the All Groups List? item.favorite = bool
//         var groupIds = itemDetails.groups.map(function (object) {
//           return object.id
//         })
//         itemDetails.favorite = groupIds.indexOf(results[0]) > -1
//         // Step Three:
//         //  - Return the item details with new information.
//         console.log(itemDetails)
//         return itemDetails
//       })
//     },
//     data: function () {
//       var _item = this
//       return _item.get()
//       .then(function (results) {
//         console.log(`${results.url}/0`)
//         var dataOptions = {
//           where: '1=1',
//           returnGeometry: false,
//         }
//         return _arcgis.request(`/query`, dataOptions, false, `${results.url}/0`)
//       })
//       .then(function (results) {
//         console.log(results)
//         return results
//       })
//     },
//     update: function (options) {//
//       return item.getUsername()
//       .then(function (username) {
//         return arcgis.request(`content/users/${username}/items/${itemId}/update`, options, true)
//         .then(function (results) {
//           return item.get(item)
//         })
//       })
//     },
//     rate: function (rating) {
//       var endpoint//
//       if (rating == null) {
//         endpoint = `content/items/${this.id}/deleteRating`
//       } else {
//         endpoint = `content/items/${this.id}/addRating`
//       }
//       return arcgis.request(endpoint, {'rating': rating}, true)
//       .then( function (results){
//         return item.get(item)
//       })
//     },
//     favorite: function (boolean) {//
//       // get self
//       return this.request(`portals/self`)
//       // get user favorite group id
//       .then(function (results) {
//         console.log(results.user.favGroupId)
//         return results.user.favGroupId
//       })
//       // construct share post data
//       .then(function (favGroupId) {
//         var options = {
//           items: itemId,
//           groups: favGroupId
//         }
//         if (boolean == true) {
//           return arcgis.request(`content/items/${itemId}/share`, options, true)
//         } else if (boolean == false) {
//           return item.request(`content/items/${itemId}/unshare`, options, true)
//         }
//       })
//     },
//     duplicate: function (options = {}) {
//       console.log(options)//
//       item.getUsername()
//       .then(function (username) {
//         item.get(item)
//         .then(function (results) {
//           // This could probably be less gross and weird
//           options.url = results.url
//           options.type = results.type
//           options.title = options.title ? options.title : `${results.title} Copy`
//           options.description = options.description ? options.description : results.description
//           options.tags = options.tags ? options.tags : results.tags
//           options.snippet = options.snippet ? options.snippet : results.snippet
//           // console.log(options)
//           // var options = Object.assign(options, results)
//           console.log(options)
//           return item.request(`content/users/${username}/addItem`, options, true)
//         })
//         .then(function (results) {
//           console.log(results)
//           var newItem = item.newInstance(results.id)
//           return newItem.get()
//         })
//       })
//     },
//     createService: function () {console.log(itemId)},
//     folder: function (folderId) {//
//       var options = {
//         folder: folderId,
//         items: itemId
//       }
//       var username
//      return this.request(`portals/self`)
//       .then(function (results) {
//         username = results.user.username
//         return results.user.username
//       })
//       .then(function (username){
//         console.log(username, itemId, options)
//         return item.request(`content/users/${username}/moveItems`, options, true)
//       })
//       .then(function (results) {
//         console.log(results)
//         if (results.error) {
//           console.log(results)
//           return results
//         } else {
//           console.log(username)
//           return item.request(`content/users/${username}/${folderId}`)
//         }
//       })
//       .then(function (results) {
//         console.log(results)
//         return results
//       })
//     },
//     groups: function () {
//       return item.request(`content/items/${itemId}/groups`)
//       .then(function (results) {
//         var itemGroups = []
//           .concat(results.admin)
//           .concat(results.member)
//           .concat(results.other)
//         return itemGroups
//       })
//     },
//     changeOwner: function (username) {//
//       var options = {
//         targetUsername: username
//       }
//       item.getUsername()
//       .then(function (username) {
//         return item.request(`content/users/${username}/items/${itemId}/reassign`, options, true)
//         .then(function (results) {
//           if (results.error) {
//             return results
//           } else {
//             return item.get(item)
//           }
//         })
//       })
//     },
//     publish: function (options = {}) {//

//       var publishOptions = {
//         itemID: itemId,
//         publishParameters: {
//           name: item.generateUUID(),
//           description: options.description,
//           hasStaticData: false,
//           maxRecordCount: -1,
//           layerInfo: {
//             capabilities: "Query, Editing"
//           }
//         }
//       }
//       return item.get(item)
//       .then(function (results) {
//         console.log(results)
//         publishOptions.fileType = results.type
//         return item.getUsername()
//       })
//       .then(function (username) {
//         console.log(publishOptions)
//         publishOptions.publishParameters = JSON.stringify(publishOptions.publishParameters)
//         return item.request(`content/users/${username}/publish`, publishOptions, true)
//         .then(function (results) {
//           console.log(results)
//           return results.item
//         })
//       })
//     },
//     export: function (format) {//
//       var exportOptions = {
//         itemId: itemId,
//         exportFormat: format
//       }
//       item.getUsername()
//       .then(function (username) {
//         return item.request(`content/users/${username}/export`, exportOptions, true)
//       })
//       .then(function (results) {
//         console.log(results)
//         return results
//       })
//     },
//     download: function () {
//       return item.request(`content/items/${itemId}/data`)
//       .then(function (results) {
//         console.log(results)
//         return results
//       })
//     },
//     deleteProtected: function (boolean) {//
//       item.getUsername()
//       .then(function (username) {
//         if (boolean == true) {
//           return item.request(`content/users/${username}/items/${itemId}/protect`, {}, true)
//           .then(function (results) {
//             return item.get(item)
//           })
//         } else if (boolean == false) {
//           return item.request(`content/users/${username}/items/${itemId}/unprotect`, {}, true)
//           .then(function (results) {
//             return item.get(item)
//           })
//         } else {
//           return item.get(item)
//           .then(function (results) {
//             return results.protected
//           })
//         }
//       })
//     },
//     register: function () {//
//       var options = {
//         itemId: itemId,
//         appType: 'multiple',
//         redirect_uris: []
//       }
//       return item.request(`oauth2/registerApp`, options, true)
//       .then(function (results) {

//         return item.getOAuth()
//       })
//     },
//     getOAuth: function () {//
//       return item.getUsername()
//       .then(function (username) {
//         return item.request(`content/users/${username}/items/${itemId}/registeredAppInfo`)
//       })
//     },
//     client_id:'LzNuD2YFMvWENXid', client_secret:'6270855046e848619ee65d77d3180b15', grant_type:'client_credentials', expiration: 1440
//     getToken: function (duration) {//
//       var expiresIn = duration ? duration : 1440
//       return item.getOAuth()
//       .then(function (results){
//         console.log(results)
//         var tokenOptions = {
//           client_id: results.client_id,
//           client_secret: results.client_secret,
//           grant_type: 'client_credentials',
//           expiration: expiresIn
//         }
//         return item.request(`oauth2/token`, tokenOptions, true)
//       })
//     },
//     usage: function (options = {}) {
//       var _item = this
//       return this.get()
//       .then(function (item) {
//         console.log(item)
//         var isHosted = item.typeKeywords.some((element) => element === "Hosted Service")
//         if (isHosted) {
//           var url = item.url.split('/')
//           return {
//             name: url[url.length - 2],
//             vars: 'num,cost,bw,stg',
//             groupby: 'etype,stype'
//           }
//         }
//         var isApp = item.typeKeywords.some((element) => element === "Application")
//         if (isApp) {
//           _item.getOAuth()
//           .then(function (oauth) {
//             console.log(oauth)
//             return {
//               vars: 'credits,num,cost,bw,stg',
//               groupby: 'etype,stype,task',
//               app_id: oauth.client_id
//             }
//           })
//         }
//         return {
//           id: item.id
//         }
//       })
//       .then(function (options) {
//         console.log(options)
//         return _item._usage(options).get()
//       })
//       .then(function (results) {
//         checkError(results)
//         console.log(results)
//         return results
//       })
//     },
//     relatedItems: function () {//
//       var relationshipTypes = [
//         'Map2Service',
//         'WMA2Code',
//         'Map2FeatureCollection',
//         'MobileApp2Code',
//         'Service2Data',
//         'Service2Service',
//         'Map2AppConfig',
//         'Item2Attachment',
//         'Item2Report',
//         'Listed2Provisioned'
//       ]
//       var getAllRelationships = []
//       var parseSet = function (set, rType, direction) {
//         set.relationship = rType
//         set.direction = direction
//         return set
//       }
//       relationshipTypes.forEach(function (rType) {
//         getAllRelationships.push(
//           item.request(`content/items/${itemId}/relatedItems`, {
//             relationshipType: rType, direction: 'forward'
//           })
//           .then(function (set){return parseSet(set, rType, 'forward')})
//         )
//         getAllRelationships.push(
//           item.request(`content/items/${itemId}/relatedItems`, {
//             relationshipType: rType, direction: 'reverse'
//           })
//           .then(function (set){return parseSet(set, rType, 'reverse')})
//         )
//       })
//       return Promise.all(getAllRelationships)
//       .then(function (results) {
//         var items = []
//         results.forEach(function (set) {
//           console.log(set)
//           if (set.relatedItems.length > 0) {
//             items[set.relationship] = {}
//             items[set.relationship][set.direction] = set.relatedItems
//           }
//         })
//         console.log(items)
//         return items
//       })
//     },
//     permissions: function (options) {//
//       var permissions = {
//         everyone: options.access == 'public' ? true : false,
//         org: options.access == 'org' ? true : false,
//         groups: options.groups
//       }
//       console.log(permissions)
//       return item.request(`content/items/${itemId}/share`, permissions, true)
//       .then(function (results) {
//         return item.get(item)
//       })
//     },
//     delete: function () {//
//       item.getUsername()
//       .then(function (username) {
//         return item.request(`content/users/${username}/items/${itemId}/delete`, {}, true)
//         .then(function (results) {
//           console.log(results)
//         })
//       })
//     },
//     search: this.search,
//     request: this.request,
//     _usage: this.usage,
//     newInstance: this.item
//   }
//   if (itemId) {
//     var item = Object.create(Item)
//     item.id = itemId
//   } else {
//     var item = Object.create({
//       create: function () {console.log('make me a new item plz')},
//       request: this.request
//     })
//   }
//   return item
// }
