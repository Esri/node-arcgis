import end from '../lib/end'

export default function CreateGroup (arcgis) {
  return function create ({title, description, summary, tags, access = 'private', isViewOnly = false, isInvitationOnly = false} = {}, cb) {
    var options = {
      title: title,
      description: description,
      snippet: summary,
      tags: tags.join(','),
      access: access,
      isViewOnly: isViewOnly,
      isInvitationOnly: isInvitationOnly
    }
    var createPromise = arcgis.request({
      url: 'community/createGroup',
      form: options,
      post: true
    })
      .then(function (confirmation) {
        return confirmation.group
      })

    return end(createPromise, cb)
  }
}
