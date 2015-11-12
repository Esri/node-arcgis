var ArcGIS = require('../lib/index')
// user token
var token = ''

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')