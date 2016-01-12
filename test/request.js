var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')
var credentials = require('./credentials')
var arcgis = ArcGIS({
  username: credentials.username,
  password: credentials.password,
  referer: 'http://localhost:8080'
})

test('The ArcGIS client makes a request to the root', function (assert) {
  return arcgis.request('/')
  .then(function (results) {
    if (results.error) throw new Error(results.error.message)
    if (results.currentVersion) assert.pass('Requesting from REST API v' + results.currentVersion)
  })
})

