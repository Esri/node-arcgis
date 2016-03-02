var end = require('../lib/end')

export default function commonMethods (i, arcgis) {
  i.update = function (options, cb) {
    var updatePromise = arcgis.request({
      url: `content/users/${i.owner}/items/${itemId}/update`,
      form: options,
      post: true
    })
    .then( function (confirm) {
      return i.get(itemId)
    })

    return end(updatePromise, cb)
  }

  i.permissions = function (options, cb) {
    var permissions = {
      everyone: options.access == 'public' ? true : false,
      org: options.access == 'org' ? true : false,
      groups: options.groups
    }
    var permissionPromise = arcgis.request({
      url: `content/items/${itemId}/share`,
      form: permissions,
      post: true
    })
    .then(function (confirm) {
      return i.get(itemId)
    })
    return end(permissionPromise, cb)
  }

  i.rate = function (rating, cb) {
    var endpoint
    if (rating == null) {
      endpoint = `content/items/${this.id}/deleteRating`
    } else {
      endpoint = `content/items/${this.id}/addRating`
    }
    var ratePromise = arcgis.request({
      url: endpoint,
      form: {'rating': rating},
      post: true
    })
    .then( function (results){
      return i.get(itemId)
    })
    return end(ratePromise, cb)
  }

  // complicated, need to do this
  // Could simplify to a search {"query":"(group:\"${favGroupId}\" AND id:\"${itemId}\")","total":0,"start":1,"num":10,"nextStart":-1,"results":[]}
  i.isFavorite = function (cb) {
    var getFavoriteGroupId = arcgis.request({url: `portals/self`})
    .then(function (self) {
      return self.user.favGroupId
    })

    var isFavoritePromise = Promise.all([
      getFavoriteGroupId,
      i.groups()
    ])
    .then(function (array) {
      var favGroupId = array[0]
      var groups = array[1]
      var groupIds = groups.map(function (group) {
        return group.id
      })
      return groupIds.indexOf(favGroupId) > -1
    })
    return end(isFavoritePromise, cb)
  }

  i.favorite = function (boolean, cb) {
    // get self
    var favoritePromise = arcgis.request({url: `portals/self`})
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
    return end(favoritePromise, cb)
  }

  i.groups = function (cb) {
    var groupPromise = arcgis.request({
      url: `content/items/${itemId}/groups`
    })
    .then(function (results) {
      var itemGroups = []
        .concat(results.admin)
        .concat(results.member)
        .concat(results.other)
      return itemGroups
    })
    return end(groupPromise, cb)
  }

  i.changeOwner = function (username, cb) {
    var options = {
      targetUsername: username
    }
    var changeOwnerPromise = arcgis.request({
      url: `content/users/${i.owner}/items/${itemId}/reassign`,
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
    return end(changeOwnerPromise, cb)
  }

  i.relatedItems = function (cb) {
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

    var relationshipPromise = Promise.all(getAllRelationships)
    .then(function (results) {
      var items = []
      results.forEach(function (set) {
        if (set.relatedItems.length > 0) {
          items[set.relationship] = {}
          items[set.relationship][set.direction] = set.relatedItems
        }
      })
      return items
    })
    return end(relationshipPromise, cb)
  }

  i.deleteProtected = function (boolean, cb) {
    var protectedPromise
    if (boolean == true) {
      protectedPromise =  arcgis.request({
        url: `content/users/${i.owner}/items/${itemId}/protect`,
        post: true
      })
      .then(function (results) {
        return i.get(itemId)
      })
    } else if (boolean == false) {
      protectedPromise = arcgis.request({
        url: `content/users/${i.owner}/items/${itemId}/unprotect`,
        post: true
      })
      .then(function (results) {
        return i.get(itemId)
      })
    }

    return end(protectedPromise, cb)
  }

  i.delete = function (cb) {
    var deletePromise = arcgis.request({
      url: `content/users/${i.owner}/items/${itemId}/delete`,
      post: true
    })

    return end(deletePromise, cb)
  }
  return i
}