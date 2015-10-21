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
    return getUsage({
      startTime: start,
      endTime: end,
      period: '1m'
    })
    .then( function (response){
      console.log(response)
      let usage = flatten(response)
      usage.activeServices = usage.products.length
      // if (usage.period == '1d') {
          let day = 8.64e+7
          console.log(day)
          console.log(usage.endTime, usage.startTime)
          let duration = usage.endTime - usage.startTime
          console.log(duration)
          let days = duration / day
          console.log(days)
      // }
      return usage
    })
    .then( function (usage) {
      return ago.request(`portals/self`)
      .then(function (org) {
        console.log(org)
        usage.subscriptionId = org.id
        usage.creditsRemaining = org.subscriptionInfo.availableCredits
        usage.subscriptionExpire = org.subscriptionInfo.expDate
        console.log(usage)
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