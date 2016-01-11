var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')
var arcgis = ArcGIS({
  token: credentials.token
})

var user = arcgis.user(credentials.username)

test('Instantiate a user object', function (assert) {
  if (user.request) {
    assert.pass('User object has request function')
  } else {
    assert.fail('User object missing request function')
  }
  assert.end()
})


test('Get user information from API', function(assert) {
  return user.get()
  .then(function (results) {
    if (results.error) throw new Error(results.error.message)
    assert.equal(results.username, credentials.username, 'Username not being returned properly from API.')
  })
})

test('Post the existing user desription to the update endpoint', function(assert) {
  var description
  return user.get()
  .then(function (results) {
    return results.description
  })
  .then(function(results) {
    description = results
    return user.update({description: description})
  })
  .then(function(results){
    if (results.error) throw new Error(results.error.message)
    assert.equals(results.description, description, 'Description mismatch')
  })
})

test('Get user content from API', function(assert) {
  return user.content()
  .then(function (results) {
    if (results.error) throw new Error(results.error.message)
    if (results.items) assert.pass('API returning items for user.')
  })
})

test('Get the users favorite items from the API', function(assert) {
  return user.favorites()
  .then(function(results) {
    if (results.error) throw new Error(results.error.message)
    if (results.query) assert.pass('API returning query for user favorites.')
  })
})

test('Get the users tags from the API', function(assert) {
  return user.tags()
  .then(function(results) {
    if (results.error) throw new Error(results.error.message)
    if (results.tags) assert.pass('API returning user tags.')
  })
})

test('Instantiate a new user object with no username', function (assert) {
  var newUser = arcgis.user()
  if (newUser.create) {
    assert.pass('Empty User object has create function')
  } else {
    assert.fail('Empty User object missing create function')
  }
  assert.end()
})