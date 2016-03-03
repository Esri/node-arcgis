var getUsage = require('./usage')
var getBilling = require('../billing/billing')
var flatten = require('./flatten-data')
var p2ms = require('./period-to-ms')

/**
 * Gets Usage Summary for an Organiztion
 * @param {Date} Start Time for reporting period. Defaults to one month ago.
 * @param {Date} End Time for reporting period. Defaults to now.
 * @param {String} Frequency period to report on (ex: 1d). Defaults to '1d'.
 * @returns {Promise} On resolution will return the usage
 */

let getSummary = (start, end, period) => {
  return getUsage({startTime: start, endTime: end, period: period})
    .then(function (response) {
      let usage = flatten(response)
      usage.activeServices = usage.products.length
      let duration = (response.endTime - response.startTime) / p2ms(usage.period)
      let average = usage.credits / duration
      usage.average = Math.round(average * 100) / 100
      return usage
    })
    .then(function (usage) {
      return getBilling()
        .then(function (response) {
          usage.billingCycleStart = response.subscription.termStart
          usage.billingCycleEnd = response.subscription.termEnd
          usage.subscriptionId = response.subscription.smsId
          usage.creditsRemaining = response.subscription.credits - response.subscription.consumedCredits
          console.log(usage)
          return usage
        })
    })
}

module.exports = getSummary
