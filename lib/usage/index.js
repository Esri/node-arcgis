import checkError from '../check-error.js'

export default function (constructor = {}) {
  var Usage = {
    /**
    * A generalized usage getter. Takes a set params and passes them to the requestUsage function, which as additional helpers baked in.
    * @param {Object} Options to update on the user
    * @returns {Promise} Updated user object.
    */
    get: function (options = {}) {
      let _usage = this
      let now = new Date();
      let month = 60 * 60 * 24 * 1000 * 30
      var defaults = {
        endTime: now.getTime(),
        period: '1d',
        vars: 'credits,num,cost,bw,stg',
        groupby: 'etype,stype,task'
      }
      defaults.startTime = defaults.endTime - month
      var parameters = Object.assign(defaults, constructor, options);
      return this.request(`portals/self/usage`, parameters)
      .then(function (response) {
        return _usage.flattenData(response)
      })
      .then(function (data) {
        let average = data.credits / duration
        let duration = (data.endTime - data.startTime ) / _usage.periodToMs(data.period)
        data.activeServices = data.products.length
        data.average = Math.round(average*100)/100
        return data
      })
      .then(function (data){
        return _usage.billing()
        .then(function(response){
          console.log(response)
          data.billingCycleStart = response.subscription.termStart
          data.billingCycleEnd = response.subscription.termEnd
          data.subscriptionId = response.subscription.smsId
          data.creditsRemaining = response.subscription.credits - response.subscription.consumedCredits
          console.log(data)
          return data
        })
      })
    },

    billing: function (options = {}) {
      return this.request(`/subscription`, options, false, 'https://billing.arcgis.com/sms/rest')
    },

    flattenData: function (response) {
      var _usage = this
      console.log(response)
      var data = {
        period: response.period,
        credits: 0,
        products: [],
        graphData: [],
        startTime: response.startTime,
        endTime: response.endTime
      }
      if (response.data.length > 0) {
        data.startCredits = parseInt(response.data[0].credits[0][0], 10)
        data.endCredits = parseInt(response.data[0].credits[response.data[0].credits.length - 1][0], 10)
      }
      response.data.forEach(function (service, index){
        var product = _usage.parseProduct(service)
        var name = _usage.sTypeToService(service.stype)

        if (product) {
          product.name = name
          data.products.push(product)
        }
        service.totalCredits = 0
        service.credits.forEach(function(entry){
          service.totalCredits += parseFloat(entry[1])
        })

        if (service.totalCredits > 0) {
          data.credits += service.totalCredits

          service.credits.forEach(function(entry){
            data.graphData.push({
              name: name,
              date: parseInt(entry[0], 10),
              credits: parseFloat(entry[1])
            })
          })
        }
      })

      data.credits = Math.round(data.credits*100)/100;
      return data
    },
    periodToMs: function (period) {
      let arr = period.split('')
      let unit = arr.pop()
      let num = arr.join('')
      if (unit == 'd') {
        return num * 8.64e+7
      } else if (unit == 'w') {
        return num * 6.048e+8
      } else if (unit == 'm') {
        return num * 2.628e+9
      } else if (unit == 'y') {
        return num * 3.154e+10
      } else {
        return undefined
      }
     },
    sTypeToService: function (stype) {
      var stypes = {
        'portal':          'Portal',
        'tiles':           'Custom Map Tiles',
        'features':        'Feature Services',
        'geocode':         'Geocoding',
        'nasimpleroute':   'Simple Routing',
        'natsproute':      'Optimized Routing',
        'nacfroute':       'Closest Facility Routing',
        'naservicearea':   'Drive-Time Areas',
        'navrproute':      'Multi Vehicle Routing',
        'geoenrich':       'GeoEnrichment',
        'geotriggers':     'Geotrigger Service',
        'spanalysis':      'Spatial Analysis',
        'demogmaps':       'Demographic Maps',
        'elevanalysis':    'Elevation Analysis',
        'nalademandpoint': 'Location Allocation'
      }
      return stypes[stype] || stype
    },
    byteToSize: function (bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes == 0) return '0 Byte'
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    },
    parseProduct: function (data) {
      var _usage = this
      var product = {
        count: 0,
        credits: 0
      };
      data.credits.forEach(function (entry) {
        product.credits += parseFloat(entry[1], 10)
      })

      if (product.credits <= 0) {
        return false
      }

      product.credits = Math.round(product.credits*1000)/1000

      // Gecoding
      if (data.stype === 'geocode' && data.etype === 'geocodecnt') {
        product.action = 'Geocode and reverse geocode operations (stored)'
        product.variable = data.num
      }

      // Tile Generation
      if (data.stype === 'tiles' && data.etype === 'tilegencnt') {
        product.action = 'Tiles generated'
        product.variable = data.num
      }

      // Storage Usage
      if ( data.etype === 'stg' ) {
        product.variable = data.stg
        product.unit = 'bytes'

        // Tiles, Feature Services, Portal
        if (data.stype === 'tiles')    { product.action = 'Storage usage of Tile Services' }
        if (data.stype === 'features') { product.action = 'Storage usage of Feature Services' }
        if (data.stype === 'portal')   { product.action = 'Storage usage of Files on Portal' }
      }

      // Service Usage
      if (data.etype === 'svcusg') {
        product.variable = data.num

        // Routing
        if (data.stype === 'nasimpleroute') { product.action = 'Simple routes' }
        if (data.stype === 'natsproute')    { product.action = 'Optimized routes' }
        if (data.stype === 'nacfroute')     { product.action = 'Closest facilities routes' }
        if (data.stype === 'naservicearea') { product.action = 'Drive times (Service Areas) generated' }
        if (data.stype === 'navrproute')    { product.action = 'Multivehicle routes (VRP)' }

        // Demographic Maps
        if (data.stype === 'demogmaps') { product.action = 'Requests to Demographic Maps Service' }

        // Geotrigger
        if (data.stype === 'geotrigger') { product.action = 'Geotrigger Service actions fired' }

        // GeoEnrichment
        if (data.stype === 'geoenrich') {
          product.variable = data.cost
          if (data.task === 'display')   { product.action = 'Non-stored GeoEnrichment requests (Infographics)' }
          if (data.task === 'report')    { product.action = 'GeoEnrichment reports generated' }
          if (data.task === 'geoenrich') { product.action = 'GeoEnrichment variables calculated (stored)' }
        }

        // Spatial Analysis
        if (data.stype === 'spanalysis') {
          product.variable = data.cost;
          if (data.task === 'AggregatePoints')    { product.action = 'Features analyzed (Aggregate Points)' }
          if (data.task === 'FindHotSpots')       { product.action = 'Features analyzed (Hot Spot Analysis)' }
          if (data.task === 'CreateBuffers')      { product.action = 'Features analyzed (Create Buffers)' }
          if (data.task === 'DissolveBoundaries') { product.action = 'Features analyzed (Dissolve Boundaries)' }
          if (data.task === 'MergeLayers')        { product.action = 'Features analyzed (Merge Layers)' }
          if (data.task === 'SummarizeWithin')    { product.action = 'Features analyzed (Summarize Within)' }
          if (data.task === 'OverlayLayers')      { product.action = 'Features analyzed (Overlay Layers)' }
          if (data.task === 'ExtractData')        { product.action = 'Features analyzed (Extract Data)' }
          if (data.task === 'FindNearest')        { product.action = 'Features analyzed (Find Nearest)' }
        }
        // Elevation Analysis
        if (data.stype === 'elevanalysis') {
          if (data.task) {
            product.action = 'Features analyzed (Elevation Analysis - ' + data.task + ')'
          } else {
            product.action = 'Features analyzed (Elevation Analysis)'
          }
          product.variable = data.cost
        }
      }
      if (!product.action || !product.variable) {
        return false
      }
      product.variable.forEach(function (entry) {
        product.count += parseInt(entry[1], 10)
      })
      if (product.unit === 'bytes') {
        product.count = _usage.byteToSize(product.count)
      }

      return product
    },
    request: this.request,
  }
  var usage = Object.create(Usage)
  return usage
}