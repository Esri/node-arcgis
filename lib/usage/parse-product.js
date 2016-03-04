/**
* Convert bytes to the appropriate unit
* param {Integer} integer representing bytes
* @return {String} Number with the correct unit appended to the end
*/
let byteToSize = function (bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

/**
* Parses billable events and returns a human readable description
* @param {Object} data object from Usage API (http://mediawikidev.esri.com/index.php/ArcGIS.com/Credit_and_Reporting_APIs)
* @return {Object} object formatted for events table
*/
let parseProduct = function (data) {
  var product = {
    count: 0,
    credits: 0
  }

  // angular.forEach(data.credits, function(entry) {
  //   product.credits += parseFloat(entry[1], 10)
  // })
  data.credits.forEach(function (entry) {
    product.credits += parseFloat(entry[1], 10)
  })

  if (product.credits <= 0) {
    return false
  }

  product.credits = Math.round(product.credits * 1000) / 1000

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
  if (data.etype === 'stg') {
    product.variable = data.stg
    product.unit = 'bytes'

    // Tiles, Feature Services, Portal
    if (data.stype === 'tiles') { product.action = 'Storage usage of Tile Services' }
    if (data.stype === 'features') { product.action = 'Storage usage of Feature Services' }
    if (data.stype === 'portal') { product.action = 'Storage usage of Files on Portal' }
  }

  // Service Usage
  if (data.etype === 'svcusg') {
    product.variable = data.num

    // Routing
    if (data.stype === 'nasimpleroute') { product.action = 'Simple routes' }
    if (data.stype === 'natsproute') { product.action = 'Optimized routes' }
    if (data.stype === 'nacfroute') { product.action = 'Closest facilities routes' }
    if (data.stype === 'naservicearea') { product.action = 'Drive times (Service Areas) generated' }
    if (data.stype === 'navrproute') { product.action = 'Multivehicle routes (VRP)' }

    // Demographic Maps
    if (data.stype === 'demogmaps') { product.action = 'Requests to Demographic Maps Service' }

    // Geotrigger
    if (data.stype === 'geotrigger') { product.action = 'Geotrigger Service actions fired' }

    // GeoEnrichment
    if (data.stype === 'geoenrich') {
      product.variable = data.cost
      if (data.task === 'display') { product.action = 'Non-stored GeoEnrichment requests (Infographics)' }
      if (data.task === 'report') { product.action = 'GeoEnrichment reports generated' }
      if (data.task === 'geoenrich') { product.action = 'GeoEnrichment variables calculated (stored)' }
    }

    // Spatial Analysis
    if (data.stype === 'spanalysis') {
      product.variable = data.cost
      if (data.task === 'AggregatePoints') { product.action = 'Features analyzed (Aggregate Points)' }
      if (data.task === 'FindHotSpots') { product.action = 'Features analyzed (Hot Spot Analysis)' }
      if (data.task === 'CreateBuffers') { product.action = 'Features analyzed (Create Buffers)' }
      if (data.task === 'DissolveBoundaries') { product.action = 'Features analyzed (Dissolve Boundaries)' }
      if (data.task === 'MergeLayers') { product.action = 'Features analyzed (Merge Layers)' }
      if (data.task === 'SummarizeWithin') { product.action = 'Features analyzed (Summarize Within)' }
      if (data.task === 'OverlayLayers') { product.action = 'Features analyzed (Overlay Layers)' }
      if (data.task === 'ExtractData') { product.action = 'Features analyzed (Extract Data)' }
      if (data.task === 'FindNearest') { product.action = 'Features analyzed (Find Nearest)' }
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
    product.count = byteToSize(product.count)
  }

  return product
}

module.exports = parseProduct
