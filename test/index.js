var ArcGIS = require('../lib/index')
// user token
var token = 'ZNYx0lboOS-P5ezBDJtPoJwidCKJKlYw5owCYXo4N8_N99fxCu6TmXFCWcQWVa2ClGdvczB9kiTHpPQgxsRuVKwvxDTAXiTqjpHYnGg3pdiWEUs28fqLmkkFCqR5-mohJWnIWTBkb6QPslVGvn3QGudqbqWtGaVXY_nd5dEIf4beAc0x4syArlPqbfTxiI_1'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')