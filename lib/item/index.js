var end = require('../lib/end')

import commonMethods from './common'
import mapMethods from './map'
import layerMethods from './layers'
import appMethods from './app'
import fileMethods from './file'

export default function Organization (arcgis) {
  var get = function (id) {
    return arcgis.request({
      url: `content/items/${id}`
    })
  }

  return function getItem (itemId, cb) {
    var promise = get(itemId).then(function (i) {
      i.get = get
      commonMethods(i, arcgis)
      if (i.type === 'Feature Service') {
        layerMethods(i, arcgis)
      } else if (i.type === 'Application') {
        appMethods(i, arcgis)
      } else if (i.type === 'GeoJson') {
        fileMethods(i, arcgis)
      } else if (i.type === 'Web Map') {
        mapMethods(i, arcgis)
      }
      return i
    })

    return end(promise, cb)
  }
}
