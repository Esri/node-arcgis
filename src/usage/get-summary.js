var getUsage = require('./usage')
var flatten = require('./flatten-data')

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
      let duration = (response.endTime - response.startTime )/ (60 * 60 * 24 * 1000)
      let usage = flatten(response)
      usage.activeServices = usage.products.length
      console.log(usage.credits, duration)
      let average = usage.credits / duration
      usage.average = Math.round(average*100)/100;
      // usage.average = average
      console.log(usage)
      return usage
    })
    .then( function (usage) {
      return ago.request(`portals/self`)
      .then(function (org) {
        usage.subscriptionId = org.id
        usage.creditsRemaining = org.subscriptionInfo.availableCredits
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