var ArcGIS = require('../lib/index')
// user token
var token = 'ZJCtNJ3b7CrPvdiFCtl95gqIzC9VG_abNJicyYw9HOVU6wgTRv3OWRMiHtU_DpXDwwdqm7sCAgreVMcGaDlTVVIhtVXKeBxjADuhhXZm6CFVKnY9vRq9UoxhMGM4P-_yM-INLl44wlqWsWl8iREuZRmY4M2HqJRdQubL60H0ixQwpCy4oCORWDt5BRvaISlr'

var ago = ArcGIS({
  token: token
})

window.ago = ago

