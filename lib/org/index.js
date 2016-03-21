var sanitizeHtml = require('sanitize-html')
var end = require('../lib/end')

export default function Organization (arcgis) {
  function get (id = 'self') {
    return arcgis.request({url: `portals/${id}`})
      .then(function (o) {
        o.description = sanitizeHtml(o.description)
        return o
      })
  }

  return function getOrganization (orgId, cb) {
    var promise = get(orgId).then(function (o) {
      o.get = get
      o.update = function (options, cb) {
        var updatePromise = arcgis.request({
          url: `portals/${o.id}/update`,
          form: options,
          post: true
        })
          .then(function (confirmation) {
            return o.get(o.id)
          })
        return end(updatePromise, cb)
      }
      o.content = function ({ num = 100, page = 0, sort = 'created', order = 'desc' } = {}, cb) {
        return end(arcgis.search({
          queryString: `"" accountid:${o.id}`,
          page: page,
          sort: sort,
          order: order
        }), cb)
      }
      o.members = function ({ num = 100, page = 0, sort = 'created', order = 'desc' } = {}, cb) {
        return end(arcgis.request({
          url: 'portals/self/users',
          form: {
            num: num,
            page: page,
            sort: sort,
            order: order
          }
        }), cb)
      }
      o.featured = function ({ num = 100, page = 0, sort = 'created', order = 'desc' } = {}, cb) {
        var featuredPromise = o.get(o.id)
          .then(function (o) {
            var featuredGroupId = o.homePageFeaturedContent.split(':')[1]
            return arcgis.group(featuredGroupId)
              .then(function (group) {
                return group.content({
                  num: num,
                  page: page,
                  sort: sort,
                  order: order
                })
              })
          })
        return end(featuredPromise, cb)
      }

      return o
    })
    return end(promise, cb)
  }
}
