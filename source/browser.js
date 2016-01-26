var ArcGIS = require('../lib/index')
// user token
var token = 'HI_wDL7muxq1brxXK9xppcZ5uYQi-brLRIk1EGcModCMxpEfYKN3RVNL4mO2MPCmGOOzKAnRMTi2YMxid3U7vBkNVUBu71WzFZjU9b3wfIhZGqJpcX9-QnE_-6nsRL0yHVuPHKTJSEB1K5BpFKPmOK6uEPlKVOJp4XljaiaWOgu8Y7VPonZ61jeAcHUEtJzD'
var ago = ArcGIS({
  token: token
})

window.ago = ago
