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

/**
* Converts stype to human-readable service name
* @param {String} stype string (http://mediawikidev.esri.com/index.php/ArcGIS.com/Credit_and_Reporting_APIs)
* @return {String} human-readable service name
*/

let stypeToService = function (stype) {
  return stypes[stype] || stype
}

module.exports = stypeToService
