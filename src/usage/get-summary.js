var getUsage = require('./usage')

/**
 * Gets Usage Summary for an Organiztion
 * @param {Date} Start Time for reporting period. Defaults to one month ago.
 * @param {Date} End Time for reporting period. Defaults to now.
 * @param {String} Frequency period to report on (ex: 1d). Defaults to '1d'.
 * @returns {Promise} On resolution will return the usage
 */

 let getSummary = (start, end, period) => {
    return getUsage({
      startTime: start,
      endTime: end,
      period: period
    })
 }

 module.exports = getSummary