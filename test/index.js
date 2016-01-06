var ArcGIS = require('../lib/index')
// user token
var token = 'A369yEc3Gk_PjHlGZCOcxLEvVUsHERrT-36yJsGHNojHPIMcF_7vnkdd2mWQDyWR97PR9Hu8wUZr6HZauKrebRIkNoYsJyMicYBnYC2tJjMZFyZKVQeR0gsdjWGGrIPBFgM2YZvULtcTmoClPTFFs8S8H7ALT9t6tgEzTcDfyd6RKwt4gXPMn9tUpmBUYSTR'
var ago = ArcGIS({
  token: token
})

window.ago = ago

