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
  console.log(User)
  var user = Object.create(User)
  console.log(user)
  user.username = username
  return user
}