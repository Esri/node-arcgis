var ArcGIS = require('../lib/index')
// user token
var token = '7addTS7UxjMqYJ_eFInoWq96H8YlIefeAKQpT9rgM_Bq7A4nC1K-taa_bq8JfQZwM_NO2Pd63V7gooCNm1BYCEXzRC8eEOoIwKTvV808fhSnDFqef2Zp7RX0w6VHcBZqAKLi-dti-d-ro2UoKHUSVpKGqr1E8_6MC54azYdG_JAtBn0OlwObGZ1peMdntcWX'
var ago = ArcGIS({
  token: token
})

window.ago = ago
