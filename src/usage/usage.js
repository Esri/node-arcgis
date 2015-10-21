/**
 * Gets Usage
 * @param {Object} Usage options
 * @returns {Promise} On resolution will return Item Object
 */

let getUsage = (options) => {
  let now = new Date();
  let month = 60 * 60 * 24 * 1000 * 30;

  console.log(options.endTime, options.startTime, month)

  options.endTime = options.endTime || now.getTime(),
  options.startTime = options.endTime || now.setHours(0,0,0,0) - month,
  options.period = options.period || '1d'
  options.vars = 'credits,num,cost,bw,stg',
  options.groupby = 'etype,stype,task',

  console.log(options.endTime, options.startTime, month)

  return ago.request(`portals/self/usage`, options)
}

module.exports = getUsage