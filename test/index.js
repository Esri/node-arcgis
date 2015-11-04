var ArcGIS = require('../src/index')
var token = 'EWwXljfYEbNbGsjgd1k5MDxyEzIoIJSweRAllpLPyZBZ_lP9O2O91E9WaGqe8Xky_6tCl1dreuID1v9RSyPmFzvPafQlfAKAKfFIsf88p46AZ2dOw8gm0as_nJGe4bCK32_O7r4LUPRdeHQLhZt-fEc5oaCjY05ArCD9zbUE1cxKri7RSuxdkk56C7MmkAqT'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')