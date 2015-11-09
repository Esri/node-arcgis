module.exports = function (orgId) {
  var Org = {
    get: require('./get'),
    summary: require('./summary'),
    update: require('./update'),
    content: require('./content'),
    members: require('./members'),
    featured: require('./featured'),
    language: require('./language'),
    arcgis: this
  }
  var org = Object.create(Org)
  org.id = orgId
  return org
}