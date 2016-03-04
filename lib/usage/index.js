export default function (constructor = {}) {
  var Usage = {
    /**
    * A generalized usage getter. Takes a set params and passes them to the requestUsage function, which as additional helpers baked in.
    * @param {Object} Options to update on the user
    * @returns {Promise} Updated user object.
    */
    get: function (options = {}) {
      let now = new Date()
      let month = 60 * 60 * 24 * 1000 * 30
      var defaults = {
        endTime: now.getTime(),
        period: '1d',
        vars: 'credits,num,cost,bw,stg',
        groupby: 'etype,stype,task'
      }
      defaults.startTime = defaults.endTime - month
      var parameters = Object.assign(defaults, constructor, options)
      return this.request('portals/self/usage', parameters)
        .then(function (response) {
          console.log('this is RAW SHIT SUCKAH ', response)
          return response
        // return _usage.interpretData(response)
        })
    // .then(function (data) {
    //   let average = data.credits / duration
    //   let duration = (data.endTime - data.startTime ) / _usage.periodToMs(data.period)
    //   data.activeServices = data.products.length
    //   data.average = Math.round(average*100)/100
    //   return data
    // })
    // .then(function (data){
    //   return _usage.billing()
    //   .then(function(response){
    //     data.billingCycleStart = response.subscription.termStart
    //     data.billingCycleEnd = response.subscription.termEnd
    //     data.subscriptionId = response.subscription.smsId
    //     data.creditsRemaining = response.subscription.credits - response.subscription.consumedCredits
    //     return data
    //   })
    // })
    },
    billing: function (options = {}) {
      return this.request('/subscription', options, false, 'https://billing.arcgis.com/sms/rest')
    },
    interpretData: function (response) {
      var _item = this
      if (!response.data) {
        return response
      }
      var data = {
        period: response.period,
        credits: 0,
        products: [],
        graphData: [],
        startCredits: null,
        endCredits: null,
        startTime: response.startTime,
        endTime: response.endTime
      }
      response.data.forEach(function (service, index) {
        console.log(service)
        var product = _item.parseProduct(service)
        var name = _item.sTypeToService(service.stype)
        console.log(product, name)
        if (product) {
          console.log(product)
          product.name = name
          data.products.push(product)
        }
        service.totalCredits = 0
        service.credits.forEach(function (entry) {
          service.totalCredits += parseFloat(entry[1])
        })
      })
      console.log(data)
      return data
    },
    periodToMs: function (period) {
      let arr = period.split('')
      let unit = arr.pop()
      let num = arr.join('')
      if (unit === 'd') {
        return num * 8.64e+7
      } else if (unit === 'w') {
        return num * 6.048e+8
      } else if (unit === 'm') {
        return num * 2.628e+9
      } else if (unit === 'y') {
        return num * 3.154e+10
      } else {
        return undefined
      }
    },
    sTypeToService: function (stype) {
      var stypes = {
        'portal': 'Portal',
        'tiles': 'Custom Map Tiles',
        'features': 'Feature Services',
        'geocode': 'Geocoding',
        'nasimpleroute': 'Simple Routing',
        'natsproute': 'Optimized Routing',
        'nacfroute': 'Closest Facility Routing',
        'naservicearea': 'Drive-Time Areas',
        'navrproute': 'Multi Vehicle Routing',
        'geoenrich': 'GeoEnrichment',
        'geotriggers': 'Geotrigger Service',
        'spanalysis': 'Spatial Analysis',
        'demogmaps': 'Demographic Maps',
        'elevanalysis': 'Elevation Analysis',
        'nalademandpoint': 'Location Allocation'
      }
      return stypes[stype] || stype
    },
    byteToSize: function (bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return '0 Byte'
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    },
    parseProduct: function (service) {
      var _usage = this
      var product = {
        count: 0,
        credits: 0
      }
      console.log(product)
      if (service.credits) {
        service.credits.forEach(function (entry) {
          product.credits += parseFloat(entry[1], 10)
        })
      }

      // if (product.credits <= 0) {
      //   return false
      // }

      product.credits = Math.round(product.credits * 1000) / 1000
      console.log(product)
      // Gecoding
      if (service.stype === 'geocode' && service.etype === 'geocodecnt') {
        product.action = 'Geocode and reverse geocode operations (stored)'
        product.variable = service.num
      }

      // Tile Generation
      if (service.stype === 'tiles' && service.etype === 'tilegencnt') {
        product.action = 'Tiles generated'
        product.variable = service.num
      }

      // Storage Usage
      if (service.etype === 'stg') {
        product.variable = service.stg
        product.unit = 'bytes'

        // Tiles, Feature Services, Portal
        if (service.stype === 'tiles') { product.action = 'Storage usage of Tile Services' }
        if (service.stype === 'features') { product.action = 'Storage usage of Feature Services' }
        if (service.stype === 'portal') { product.action = 'Storage usage of Files on Portal' }
      }

      // Service Usage
      if (service.etype === 'svcusg') {
        product.variable = service.num

        // Routing
        if (service.stype === 'nasimpleroute') { product.action = 'Simple routes' }
        if (service.stype === 'natsproute') { product.action = 'Optimized routes' }
        if (service.stype === 'nacfroute') { product.action = 'Closest facilities routes' }
        if (service.stype === 'naservicearea') { product.action = 'Drive times (Service Areas) generated' }
        if (service.stype === 'navrproute') { product.action = 'Multivehicle routes (VRP)' }

        // Demographic Maps
        if (service.stype === 'demogmaps') { product.action = 'Requests to Demographic Maps Service' }

        // Geotrigger
        if (service.stype === 'geotrigger') { product.action = 'Geotrigger Service actions fired' }

        // GeoEnrichment
        if (service.stype === 'geoenrich') {
          product.variable = service.cost
          if (service.task === 'display') { product.action = 'Non-stored GeoEnrichment requests (Infographics)' }
          if (service.task === 'report') { product.action = 'GeoEnrichment reports generated' }
          if (service.task === 'geoenrich') { product.action = 'GeoEnrichment variables calculated (stored)' }
        }

        // Spatial Analysis
        if (service.stype === 'spanalysis') {
          product.variable = service.cost
          if (service.task === 'AggregatePoints') { product.action = 'Features analyzed (Aggregate Points)' }
          if (service.task === 'FindHotSpots') { product.action = 'Features analyzed (Hot Spot Analysis)' }
          if (service.task === 'CreateBuffers') { product.action = 'Features analyzed (Create Buffers)' }
          if (service.task === 'DissolveBoundaries') { product.action = 'Features analyzed (Dissolve Boundaries)' }
          if (service.task === 'MergeLayers') { product.action = 'Features analyzed (Merge Layers)' }
          if (service.task === 'SummarizeWithin') { product.action = 'Features analyzed (Summarize Within)' }
          if (service.task === 'OverlayLayers') { product.action = 'Features analyzed (Overlay Layers)' }
          if (service.task === 'ExtractData') { product.action = 'Features analyzed (Extract Data)' }
          if (service.task === 'FindNearest') { product.action = 'Features analyzed (Find Nearest)' }
        }
        // Elevation Analysis
        if (service.stype === 'elevanalysis') {
          if (service.task) {
            product.action = 'Features analyzed (Elevation Analysis - ' + service.task + ')'
          } else {
            product.action = 'Features analyzed (Elevation Analysis)'
          }
          product.variable = service.cost
        }
      }
      // if (!product.action || !product.variable) {
      //   return false
      // }
      product.variable.forEach(function (entry) {
        product.count += parseInt(entry[1], 10)
      })
      if (product.unit === 'bytes') {
        product.count = _usage.byteToSize(product.count)
      }
      console.log(product)
      return product
    },
    request: this.request
  }
  var usage = Object.create(Usage)
  return usage
}
