var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')
var arcgis = ArcGIS({
  token: credentials.token
})

test('The ArcGIS client makes a request to the root', function (assert) {
  return arcgis.request('/')
  .then(function (results) {
    assert.error(results.error)
    assert.ok(results.currentVersion, 'Requesting from REST API v' + results.currentVersion)
  })
})

