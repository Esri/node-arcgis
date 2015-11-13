
module.exports = function (itemId) {
  var Item = {
    new: function() {console.log(itemId)},
    get: require('./get'),
    favorite: function() {console.log(itemId)},
    rate: require('./rate'),
    update: function() {console.log(itemId)},
    createService: function() {console.log(itemId)},
    folder: function() {console.log(itemId)},
    groups: function() {console.log(itemId)},
    owner: function() {console.log(itemId)},
    publish: function() {console.log(itemId)},
    export: function() {console.log(itemId)},
    data: function() {console.log(itemId)},
    deleteProtected: function() {console.log(itemId)},
    register: function() {console.log(itemId)},
    oAuth: function() {console.log(itemId)},
    relatedItems: function() {console.log(itemId)},
    permissions: function() {console.log(itemId)},
    delete: function() {console.log(itemId)},
    arcgis: this
  }
  if (itemId) {
    var item = Object.create(Item)
    item.id = itemId
  } else {
    var item = Object.create({
      // new: require('./create'),
      arcgis: this
    })
  }
  return item
}

