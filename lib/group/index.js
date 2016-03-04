import end from '../lib/end'

export default function Group (arcgis) {
  function get (id) {
    return arcgis.request({
      url: `community/groups/${id}`
    })
  }

  return function getGroup (groupId, cb) {
    var promise = get(groupId).then(function (g) {
      g.get = get
      g.content = function ({ num = 100, page = 0, sort = 'created', order = 'desc' } = {}, cb) {
        return end(arcgis.search({
          queryString: `"" group:${groupId}`,
          page: page,
          sort: sort,
          order: order
        }), cb)
      }
      g.update = function (options, cb) {
        var updatePromise = arcgis.request({
          url: `community/groups/${groupId}/update`,
          form: options,
          post: true
        })
          .then(function (confirmation) {
            return g.get(groupId)
          })

        return end(updatePromise, cb)
      }
      g.members = function ({ num = 100, page = 0, sort = 'created', order = 'desc' } = {}, cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/users`,
          form: {
            num: num,
            page: page,
            sort: sort,
            order: order
          }
        }), cb)
      }
      g.addUsers = function (users = [], cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/addUsers`,
          form: {users: users},
          post: true
        }), cb)
      }
      g.removeUsers = function (users = [], cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/removeUsers`,
          form: {users: users},
          post: true
        }), cb)
      }
      g.inviteUsers = function ({ users = [], role = 'group_member', expiration = 1440 } = {}, cb) {
        var options = {
          users: users,
          role: role,
          expiration: expiration
        }
        return end(arcgis.request({
          url: `community/groups/${groupId}/invite`,
          form: options,
          post: true
        }), cb)
      }
      g.join = function (cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/join`,
          form: {},
          post: true
        }), cb)
      }
      g.leave = function (form = {}, cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/leave`,
          form: {},
          post: true
        }), cb)
      }
      g.changeOwner = function (username, cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/reassign`,
          form: {targetUsername: username},
          post: true
        }), cb)
      }
      g.delete = function (cb) {
        return end(arcgis.request({
          url: `community/groups/${groupId}/delete`,
          form: {},
          post: true
        }), cb)
      }

      return g
    })

    return end(promise, cb)
  }
}
