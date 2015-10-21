var getUsage = require('./usage')

/**
 * Gets Usage Summary for an Organiztion
 * @param {String} Start Time for reporting period. Defaults to one month ago.
 * @param {String} End Time for reporting period. Defaults to now.
 * @returns {Promise} On resolution will return the usage
 */

 let getSummary = (start = Date.now() - 2.628e+9, end = Date.now()) => {
    return getUsage({
      start: start,
      end: end
    })
 }

 module.exports = getSummary