var end = require('../lib/end')

export default function layerMethods (i, arcgis) {
  //  Will require stronger Create voodoo
  //  i.duplicate = function (cb) {
  //    var duplicatePromise =
  //    return end(duplicatePromise, cb)
  //  }
  i.data = function (layer = 0, cb) {
    var dataPromise = arcgis.request({
      url: '/query',
      form: {where: '1=1'},
      rootUrl: `${i.url}/${layer}`
    })
    return end(dataPromise, cb)
  }
  // Doesn't work ???
  i.exportLayer = function (format = 'GeoJSON', cb) {
    var exportOptions = {
      itemId: i.id,
      exportFormat: format
    }
    var exportPromise = arcgis.request({
      url: `content/users/${i.owner}/export`,
      form: exportOptions,
      post: true
    })
    return end(exportPromise, cb)
  }
  //  Don't know how this works yet
  //  i.generateTiles = function (cb) {
  //    var tilesPromise =
  //    return end(tilesPromise, cb)
  //  }
  //  This is complicated?
  //  i.usage = function (cb) {
  //    var usagePromise =
  //    return end(usagePromise, cb)
  //  }
  return i
}
