module.exports = function (groupId) {
  var Group = {
    get: require('./get'),
    content: require('./content'),
    update: function() {console.log(`update group ${groupId} information`)},
    delete: function() {console.log(`delete group ${groupId}`)},
    users: function() {console.log(`get users in group ${groupId}`)},
    removeUser: function() {console.log(`kick user out of group ${groupId}`)},
    join: function() {console.log(`request to join group ${groupId}`)},
    leave: function() {console.log(`leave group ${groupId}`)},
    changeOwner: function() {console.log(`change owner of group ${groupId}`)},
    arcgis: this
  }

  var group = Object.create(Group)
  group.id = groupId

  return group
}