var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')
var arcgis = ArcGIS({
  token: credentials.token
})

var org = arcgis.organization()
var orgDescription;

test('Instantiate an organization object', function (assert) {
  if (org.id) {
    assert.pass('Org object has id property')
  } else {
    assert.fail('Org object missing id property')
  }
  assert.end()
})

test('Get the organization information', function (assert) {
  return org.get()
  .then(function (results) {
    if (results.error) throw new Error(results.error.message)
    orgDescription = results.description
    if (results.id) assert.pass('API returning organization information.')
  })
})

test('Update the organization information', function (assert) {
  return org.update({description: orgDescription})
  .then(function (results) {
    if (results.error) throw new Error(results.error.message)
    assert.equal(results.description, orgDescription, 'Description mismatch')
  })
})


// test('Get organization content')
// test('Get organization members')
// test('Get organization featured content')