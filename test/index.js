var ArcGIS = require('../lib/index')
// user token
var token = 'wkBB62iGAl-hSKvYcIir2_twDcxM3v3nbTAECcUDLODVFQ4ixmCC7Qn3kSIAQB3NevRNXgc858jTJLMVT7_Z_Lbwqs-29ivw-WinyeDOgbUJOvuklnsUC0_pzfzU14fvUlKvmCgfDStqdWA3spvoTdUVDZgto5ZZ_bsRePgVceohIbkCan6G9U5JUaU6EwDV'
var ago = ArcGIS({
  token: token
})

window.ago = ago

