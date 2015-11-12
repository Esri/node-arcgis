/**
 * Creates a new group
 * @param {String} Group ID
 * @returns {Promise} On resolution will return the group object.
 */
let create = function (options) {
  if (options.tags) {
    options.tags = options.tags.join(', ')
  }
  if (!options.access) {
    options.access = 'private'
  }

  console.log(`create a new group called ${options.title}`)
  console.log(options)

  return this.arcgis.request(`community/createGroup`, options, true)
  .then(function (results){
    console.log(results.group.id)
    return this.arcgis.group(results.group.id)
  })
}

module.exports = create