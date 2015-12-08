var ArcGIS = require('../lib/index')
// user token
var token = 'yEmvesxDwl7YDiMchjgPErYahOYsjudZgL38i3y_Fjb8fNTVF00IHuGVH9B1i0RKgKLTDB5MjO1ZHgtfa6OQrEcENmAqR45hEmGM_logtMjwtM_hAtDIJQGgYv7z3g-0VjKvKhWg9GqnBC2qTZCe8-lDWHY56Wb3ec5dH95DLrJWnktsaYEwMzR-2HxE9Hsb'

var ago = ArcGIS({
  token: token
})

window.ago = ago

