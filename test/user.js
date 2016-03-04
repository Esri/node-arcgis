var test = require('blue-tape')
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')
var arcgis = ArcGIS({
  token: credentials.userToken
})

test('Instantiate a user object', function (assert) {
  var user = arcgis.user(credentials.username)
  assert.ok(user.request)
  assert.end()
})

test('Get user information from API', function (assert) {
  var user = arcgis.user(credentials.username)
  return user.get()
    .then(function (results) {
      assert.error(results.error)
      assert.equal(results.username, credentials.username, 'Username not being returned properly from API.')
    })
})

test('Post the existing user desription to the update endpoint', function (assert) {
  var description
  var user = arcgis.user(credentials.username)
  return user.get()
    .then(function (results) {
      description = results.description
      return user.update({description: description})
    })
    .then(function (results) {
      assert.error(results.error)
      assert.equals(results.description, description, 'Description mismatch')
    })
})

test('Get user content from API', function (assert) {
  var user = arcgis.user(credentials.username)
  return user.content()
    .then(function (results) {
      assert.error(results.error)
      assert.ok(results.items, 'API returning items for user.')
    })
})

test('Get the users favorite items from the API', function (assert) {
  var user = arcgis.user(credentials.username)
  return user.favorites()
    .then(function (results) {
      assert.error(results.error)
      assert.ok(results.query, 'API returning query for user favorites.')
    })
})

test('Get the users tags from the API', function (assert) {
  var user = arcgis.user(credentials.username)
  return user.tags()
    .then(function (results) {
      assert.error(results.error)
      assert.ok(results.tags, 'API returning user tags.')
    })
})

test('Instantiate a new user object with no username', function (assert) {
  var user = arcgis.user()
  assert.ok(user.create, 'Empty User object has create function')
  assert.end()
})
