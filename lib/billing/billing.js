/**
 * Gets Billing information
 * @param {Object} Billing options
 * @returns {Promise} On resolution will return Billing Object
 */

let getBilling = (options = {}) => {
  return ago.request(`/subscription`, options, 'https://billing.arcgis.com/sms/rest')
}

module.exports = getBilling