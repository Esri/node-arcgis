/**
 * Gets items owned by a user by username.
 * @param {String} Username who's content is desired
 * @returns {Promise} On resolution will return an object of all the users content.
 */

let getOrganizationContent = userName => ago.request(`content/users/${userName}`)

module.exports = getOrganizationContent