var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')
var arcgis = ArcGIS({
  token: credentials.userToken
})

test('Instantiate an organization object', function (assert) {
  var org = arcgis.organization()
  assert.ok(org.id, 'Org object has id property')
  assert.end()
})

test('Get the organization information', function (assert) {
  var org = arcgis.organization()
  return org.get()
  .then(function (results) {
    assert.error(results.error)
    assert.ok(results.id, 'API returning organization information.')
  })
})

test('Update the organization information', function (assert) {
  var orgDescription
  var org = arcgis.organization()
  return org.get()
  .then(function (results) {
    orgDescription = results.description
    return org.update({description: orgDescription})
  })
  .then(function (results) {
    assert.error(results.error)
    assert.equal(results.description, orgDescription, 'Description mismatch')
  })
})

// test('Get organization content')
// test('Get organization members')
// test('Get organization featured content')
