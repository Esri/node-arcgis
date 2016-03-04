var end = require('../lib/end')

export default function mapMethods (i, arcgis) {
  i.layers = function (cb) {
    var layersPromise = arcgis.request({
      url: `content/items/${i.id}/data`
    })
    return end(layersPromise, cb)
  }
  return i
}
