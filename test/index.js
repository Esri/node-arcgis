var ArcGIS = require('../src/index')
var token = 'DiR_31qLRkZGN58w3gYB4NIN0KFqdsnKEOIsoJTT6w70LaH_yjFSnaYTz_4VO-s2YXX5YM9s-4mMJQBQGsA0oCVQ3Cj8_VWuvQeR7JmLSaIJsElGKkl8rQRRVZ1PBsQoOohJo6sv577-qS4_MD9OdVpHnzJzXrE6ADsDjx7zAFSRt45BJCG5RFZqxO8KNckz'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')