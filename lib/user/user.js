module.exports = function (username) {
  var User = {
    get: require('./get'),
    update: require('./update'),
    delete: require('./delete'),
    content: require('./content'),
    favorites: require('./favorites'),
    tags: require('./tags'),
    enabled: require('./enabled'),
    arcgis: this
  }
  if (username) {
    var user = Object.create(User)
    user.username = username
  } else {
    var user = Object.create({
      create: require('./create'),
      arcgis: this
    })
  }
  return user
}