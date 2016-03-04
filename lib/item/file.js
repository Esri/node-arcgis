var end = require('../lib/end')

var generateUUID = function () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })

  return uuid
}

export default function fileMethods (i, arcgis) {
  i.update = function (options, cb) {
    var updatePromise
    return end(updatePromise, cb)
  }

  i.download = function (cb) {
    var downloadPromise = arcgis.request({
      url: `content/items/${i.id}/data`
    })
    return end(downloadPromise, cb)
  }

  i.publish = function (cb) {
    var publishParams = {
      name: generateUUID(),
      hasStaticData: true,
      maxRecordCount: -1,
      layerInfo: {
        capabilities: 'Query, Editing'
      }
    }
    var publishOptions = {
      itemID: i.id,
      filetype: i.type,
      publishParameters: JSON.stringify(publishParams)
    }

    var publishPromise = arcgis.request({
      url: `content/users/${i.owner}/publish`,
      form: publishOptions,
      post: true
    })

    return end(publishPromise, cb)
  }

  return i
}
