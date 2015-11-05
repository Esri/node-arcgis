/**
 * Creates a new invitation, which is emailed to a user.
 * @param {Object} New User options
 * @returns {Promise} On resolution will return the user invitation object.
 */


let create = function (options) {
  console.log(`create a new user`)
  console.log(options)

  // check username
  // community/checkUsernames
    // POST params
    // usernames:nikolaswise_agotest2_esripdx

  options.invitationList = {
    invitations: options.invitations
  }
  delete options.invitations

  return this.arcgis.request(`portals/self/invite`, options, true)
  .then( function (results) {
    console.log(results)
    return results
  })
}

 module.exports = create