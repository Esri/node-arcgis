var sanitizeHtml = require('sanitize-html')

/**
 * Gets organization by ID, or urlKey.
 * @param {String} Organization ID or unique urlKey
 * @returns {Promise} On resolution will return Organization Object
 */

// Added Value to Organiztions:
// Cleaned Org description
// Org snippet
// Number of Users
// Number of Active Users
// Number of Liscences Total
// Number of Liscenses in Use
// Usage Summary
// Latest Active Users (12)
// Featured content as items (12)
// Destroy a ton of weird garbage
  // Rotator Panels
  // homePageFeaturedContent (this gets replaced by items, cleans up after itself)
  // homePageFeaturedContentCount

let getOrganization = (orgId, options) => {
  return ago.request(`portals/${orgId}`)
  .then(function (org) {
    org.description = sanitizeHtml(org.description)
    console.log(org.description)
    return org
  })
}

module.exports = getOrganization