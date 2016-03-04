let getUsage = (options = {}) => {
  let now = new Date()
  let month = 60 * 60 * 24 * 1000 * 30

  options.endTime = options.endTime || now.getTime()
  options.startTime = options.startTime || options.endTime - month
  options.period = options.period || '1d'
  options.vars = 'credits,num,cost,bw,stg'
  options.groupby = 'etype,stype,task'
  // return arcgis.request(`portals/self/usage`, options)
}

module.exports = getUsage
