/**
 * Gets Usage
 * @param {Object} Usage options
 * @returns {Promise} On resolution will return Item Object
 */

let getUsage = (options) => {
  options.endTime = options.endTime || Date.now(),
  options.startTime = options.endTime || Date.now() - 2.628e+9,
  options.period = options.perion || '1d'
  options.vars = 'credits,num,cost,bw,stg',
  options.groupby = 'etype,stype,task',
  options.period = '1d'

  return ago.request(`portals/self/usage`, options)
}

module.exports = getUsage