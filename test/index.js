var ArcGIS = require('../src/index')
// user token
var token = ''

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')