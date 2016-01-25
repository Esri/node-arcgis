var ArcGIS = require('../lib/index')
// user token
var token = 'I208YvUZrCTXsr3evxLVTlQp8beW7dvkOieSlGFntT-aafYWCH3mZ9r2Y8rKo_k54Rm5PmvzIOcup624ozgH_fyYLtKnOy3JZcigtioSc5uL3PxzKADRbe6OE8_pKekOUgE-9ovhqwTPBm_akcGN7F5aSmMlVVeUubjQamWEVrvtvf_YglpmUpLnto1VnKFA'
var ago = ArcGIS({
  token: token
})

window.ago = ago
