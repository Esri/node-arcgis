var getUsage = require('./usage')
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
    return getUsage(start, end, period)
    .then( function (response){
      // flatten the weird api response into somethng manageable
      let usage = flatten(response)
      // how many unique services are included
      usage.activeServices = usage.products.length
      // duration that response covers in units of period
      let duration = (response.endTime - response.startTime )/ p2ms(usage.period)
      // average credit usage per period
      let average = usage.credits / duration
      // round that sucker out to 2 decimel places
      usage.average = Math.round(average*100)/100;
      console.log(usage)
      return usage
    })
    .then( function (usage) {
      return ago.request(`portals/self`)
      .then(function (org) {
        // add org id to summary
        usage.subscriptionId = org.id
        // add remaining credits to summary
        usage.creditsRemaining = org.subscriptionInfo.availableCredits
        // add experiration date to summary
        usage.subscriptionExpire = org.subscriptionInfo.expDate
        return usage
      })
    })
 }

//let sample = {
  //credits: 100,                      //total credits used
  //period: 1d,                        //unit of aggregation [day,week,month]
  //average: .75,                      //average credits used per period
  //activeServices: 3,                 //number of services that used credits
  //activeApplications: 9,             //number of apps that used credits

  //billingCycleStart: 1403913150650,  //start of billing cycle
  //billingCycleEnd: 1403913150650,    //end of billing cycle

  //accountType: "developer",          //developer,org


//}

 module.exports = getSummary