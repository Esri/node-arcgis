var User = {
  get: require('./get'),
  update: require('./update'),
  delete: require('./delete'),
  content: require('./content'),
  content: require('./favorites'),
  tags: require('./tags'),
  enable: require('./enable'),
  disable: require('./disable')
}

module.exports = (username = 'self') => {
  var user = Object.create(User)
  user.username = username
  return user
}