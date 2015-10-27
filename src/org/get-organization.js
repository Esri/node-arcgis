var sanitizeHtml = require('sanitize-html')

/**
 * Gets organization by ID, or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @returns {Promise} On resolution will return Organization Object
 */

// sample public org id
// e8gGAYmR5kxEFApE

// Added Value to Organiztions:
// Cleaned Org description ✓
// Org snippet ✓
// Number of Users ✓
// Number of Active Users ✓
// Number of Liscences Total
// Number of Liscenses in Use
// Usage Summary
// Latest Active Users (100) ✓
// Featured content as items (100) ✓
// Destroy a ton of weird garbage
  // Rotator Panels ✓
  // homePageFeaturedContent (this gets replaced by items, cleans up after itself) ✓
  // homePageFeaturedContentCount ✓

let getOrganization = (orgId = 'self') => {
  var options = {}
  if (orgId != 'self') {
    options.public = true
  }
  console.log(options)
  return ago.request(`portals/${orgId}`, options)
  // Clean Org Description
  .then(function (org) {
    org.description = sanitizeHtml(org.description)
    return org
  })
  // Get Org Summary
  .then(function (org) {
    return ago.organization.getSummary(orgId, options)
    .then(function (results){
      org.summary = results
      return org
    })
  })
  // Get Org uses by lastLogin
  .then(function (org) {
    if (options.public) {
      return org
    } else {
      return ago.organization.getUsers(options)
      .then(function (results){
        // Set the number of users
        org.subscriptionInfo.numUsers = results.total
        org.users = results.users.sort(function(a,b){
          var x = a.lastLogin > b.lastLogin? -1:1;
          return x;
        });
        // Set the number of active users
        org.subscriptionInfo.activeUsers = org.users.filter(function (user){
          return !user.disabled
        }).length
        return org
      })
    }
  })
  // Get featured item group
  .then(function (org) {
    return ago.group.getGroup(org.homePageFeaturedContent.split(':')[1]).then(function (group){
      group.description = sanitizeHtml(group.description)
      org.featuredContent = group
      return org
    })
  })
  // Get Featured item group content
  .then(function (org) {
    return ago.group.getContent(org.featuredContent.id).then(function (results){
      org.featuredContent.items = results.results
      return org
    })
  })
  // Clean up org content object a little
  .then(function (org) {
    delete org.rotatorPanels
    delete org.homePageFeaturedContent
    delete org.homePageFeaturedContentCount
    console.log(org)
    return org
  })
}

module.exports = getOrganization