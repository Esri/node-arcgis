var ArcGIS = require('../lib/index')
// user token
var token = 'nO8O80y0DIpzY63tpn1-GdEdTanNPdYpjNwCjM10_UDP7-r4KChXoJL9JtX6hrWTlpoEqJrzzx9tqecEZiv7ClVozHQeppUc4LnVoSVOUBtdizb4AbbQ4tKh_f5xvU2OpZlYgdZEzxbFwpBOYNigKnGnQn7ze2kT7Jjd6W6KOj3cDbml0XUh18quMEybLDQO'
var arcgis = ArcGIS({
  token: token
})

window.arcgis = arcgis
