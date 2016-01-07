var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')
var arcgis = ArcGIS({
  token: credentials.token
})

test('The ArcGIS client makes a request to the root', function (assert) {
  return arcgis.request('/')
  .then(function (results) {
    if (results.error) throw new Error(results.error.message)
    if (results.currentVersion) assert.pass('Requesting from REST API v' + results.currentVersion)
  })
})

