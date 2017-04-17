import end from '../lib/end'

export default function CreateItem (arcgis) {
  return function create ({owner, title, type, description, url, snippet, tags, access = 'private', licenseInfo, thumbnail, extent} = {}, cb) {
    var options = {
      title: title,
      description: description,
      type: type,
      url: url,
      snippet: snippet,
      tags: tags.join(','),
      access: access,
      licenseInfo: licenseInfo,
      thumbnail: thumbnail,
      extent: extent
    }

    var createPromise = arcgis.request({
      url: `content/users/${owner}/addItem`,
      form: options,
      post: true
    })
    .then(function (confirm) {
      return arcgis.request({url: `content/items/${confirm.id}`})
    })

    return end(createPromise, cb)
  }
}
