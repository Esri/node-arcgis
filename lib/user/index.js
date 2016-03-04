var end = require('../lib/end')

export default function User (arcgis) {
  function get (username) {
    return arcgis.request({url: `community/users/${username}`})
  }

  return function getUser (username, cb) {
    var promise = get(username).then(function (u) {
      u.get = get
      u.update = function (options, cb) {
        var updatePromise = arcgis.request({
          url: `community/users/${username}/update`,
          form: options,
          post: true
        })
          .then(function (results) {
            return u.get()
          })
        return end(updatePromise, cb)
      }
      u.delete = function (cb) {
        return end(arcgis.request({
          url: `community/users/${username}/delete`,
          form: {},
          post: true
        }), cb)
      }
      u.content = function ({ num = 100, page = 0, sort = 'created', order = 'desc' } = {}, cb) {
        return end(arcgis.search({
          queryString: `"" owner:${username}`,
          page: page,
          sort: sort,
          order: order
        }), cb)
      }
      u.favorites = function (options, cb) {
        var favoritesPromise = arcgis.group(u.favGroupId)
          .then(function (g) {
            return g.content(options)
          })
        return end(favoritesPromise, cb)
      }
      u.tags = function (cb) {
        return end(arcgis.request({
          url: `community/users/${username}/tags`
        }), cb)
      }
      u.enabled = function (bool, cb) {
        if (bool === false) {
          return end(arcgis.request({
            url: `community/users/${username}/disable`,
            form: {},
            post: true
          }), cb)
        } else {
          return end(arcgis.request({
            url: `community/users/${username}/enable`,
            form: {},
            post: true
          }), cb)
        }
      }
      return u
    })
    return end(promise, cb)
  }
}
