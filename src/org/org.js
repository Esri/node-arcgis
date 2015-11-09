module.exports = function (orgId) {
  var Org = {
    get: require('./get'),
    summary: require('./summary'),
    update: require('./update'),
    content: require('./content'),
    members: require('./members'),
    featured: require('./featured'),
    favorites: require('./favorites'),
    language: require('./language'),
    arcgis: this
  }
  var org = Object.create(Org)
  var org.id = orgId
  return org
}