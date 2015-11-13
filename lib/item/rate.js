/**
 * Rates an Item
 * @param {Number} An integer between 0 and 5. Pass a value of 'null' to delete the authenticated users rating.
 * @returns {Promise} On resolution will return the new item object, with the rating updated.
 */

let rate = function(rating) {
  var endpoint
  var client = this
  if (rating == null) {
    endpoint = `content/items/${this.id}/deleteRating`
  } else {
    endpoint = `content/items/${this.id}/addRating`
  }
  return this.arcgis.request(endpoint, {'rating': rating}, true)
  .then( function(results){
    return client.get(client)
  })
}

module.exports = rate