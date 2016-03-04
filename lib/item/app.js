var end = require('../lib/end')

export default function appMethods (i, arcgis) {
  i.getOAuth = function (cb) {
    return end(arcgis.request({
      url: `content/users/${i.owner}/items/${i.id}/registeredAppInfo`
    }), cb)
  }

  i.register = function (cb) {
    var options = {
      itemId: i.id,
      appType: 'multiple',
      redirect_uris: []
    }
    var registerPromise = arcgis.request({
      url: 'oauth2/registerApp',
      form: options,
      post: true
    })
      .then(function (results) {
        return i.getOAuth()
      })
    return end(registerPromise, cb)
  }

  i.getToken = function (duration = 1440, cb) {
    var tokenPromise = i.getOAuth()
      .then(function (oauth) {
        var tokenOptions = {
          client_id: oauth.client_id,
          client_secret: oauth.client_secret,
          grant_type: 'client_credentials',
          expiration: duration
        }
        return arcgis.request({
          url: 'oauth2/token',
          form: tokenOptions,
          post: true
        })
      })
    return end(tokenPromise, cb)
  }

  return i
}
