var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')

var arcgis = ArcGIS({
  username: credentials.username,
  password: credentials.password,
  referer: 'http://localhost:8080'
})

var org = arcgis.organization()

test('Instantiate an organization object', function (assert) {
  assert.ok(org.id, 'Org object has id property')
  assert.end()
})

test('Get the organization information', function (assert) {
  return org.get()
  .then(function (results) {
    assert.error(results.error)
    assert.ok(results.id, 'API returning organization information.')
  })
})

test('Update the organization information', function (assert) {
  var orgDescription
  return org.get()
  .then(function (results) {
    orgDescription = results.description
    return org.update({description: orgDescription})
  }
  .then(function (results) {
    assert.error(results.error)
    assert.equal(results.description, orgDescription, 'Description mismatch')
  })
})

// test('Get organization content')
// test('Get organization members')
// test('Get organization featured content')
