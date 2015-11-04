var ArcGIS = require('../src/index')
var token = 'uWdEexAXtoVB6NA3c8DzpAc9uFksj_G7FOPTAQUNdUsVLv9S348hoQNool2lBa0z_bTZlqDSKZyg7JRkbfLZsIJlNfqFksX0MpOMTacW6UMzODKaYfDW-JXHhYHnbYT5xGB4TeJ4fDuCPz0u_K1P29yk01tMaCI1YAEmnV9opWeWUF1pmEPyBDH9f5-gv2Ka'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')