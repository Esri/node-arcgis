import end from '../lib/end'

export default function CreateItem (arcgis) {
  return function create ({owner, title, type, description, url, data, snippet, tags, access = 'private', licenseInfo, thumbnail, extent} = {}, cb) {
    var options = {
      title: title,
      description: description,
      type: type,
      tags: tags.join(','),
      access: access
    }
    if (url !== undefined) { options.url = url }
    if (data !== undefined) { options.text = data }
    if (snippet !== undefined) { options.snippet = snippet }
    if (licenseInfo !== undefined) { options.licenseInfo = licenseInfo }
    if (thumbnail !== undefined) { options.thumbnail = thumbnail }
    if (extent !== undefined) { options.extent = extent }

    var createPromise = arcgis.request({
      url: `content/users/${owner}/addItem`,
      form: options,
      post: true
    })
    .then(function (confirm) {
      return arcgis.item(confirm.id)
    })

    return end(createPromise, cb)
  }
}
