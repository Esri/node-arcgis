module.exports = function (username) {
  var User = {
    get: require('./get'),
    update: require('./update'),
    delete: require('./delete'),
    content: require('./content'),
    favorites: require('./favorites'),
    tags: require('./tags'),
    enable: require('./enable'),
    disable: require('./disable'),
    arcgis: this
  }

  var user = Object.create(User)
  user.username = username

  return user
}