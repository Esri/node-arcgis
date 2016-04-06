var ArcGIS = require('../lib/index')
// user token
var token = 'z2SIAWOcrcxeXozmdM6uae_SqcHnJQrXDIwzemonchG-uI1V9FjFsLC6w0NSSICpJR8c5Cd2mtX33GgF2xzmAY_2wD7cIHOVjAU1cmArhHZN-KLeLIJEB9nG9ZxeJvtAdotdADRvdhkS0jEve3rp38uxZSWHHwzwE27xcdA8lzmiLYJezNaniS_2rbQaNC4_'
var arcgis = ArcGIS({
  token: token
})

window.arcgis = arcgis
