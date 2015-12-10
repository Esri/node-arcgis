var ArcGIS = require('../lib/index')
// user token
var token = 'mO1-NtBJdtvo0TuOmR6XB0fwdWUpNgRvJ_kU7EW14JDLONslj7IqMSarB28RpO5fkzPVsCP3xxGNdU-_XE7InUiMCaBLr6rIBX9X411je5qVWpNl3LYlPA1ggykonCaEamIbFZUeHyGzHuS5tPKqJ8WnA3NBhrvcGtAMmrlWdOxAamxzNQxvL4DPE-GeTpyA'

var ago = ArcGIS({
  token: token
})

window.ago = ago

