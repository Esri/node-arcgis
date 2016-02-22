var ArcGIS = require('../lib/index')
// user token
var token = 'FsmwX49d3C4UmvnF0F7v1hDBes_dwjGUkAYKLzZZcqfcGHcAvK4rH3MZOMTVGhIQOwJpN2t95oJztHd5FWqWNSljhE8-kGnghbUSPrTUdIKjDyLYk2_si3FED5pdoeJwouTevAGm7TbevlJtYvisuuws0_4uZKkOCKwSyfVoSnUIMNfuSu5Zwi0Z0_MLF5ZK'
var arcgis = ArcGIS({
  token: token
})

window.arcgis = arcgis
