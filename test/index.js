var ArcGIS = require('../src/index')
// user token
var token = '4b0sz7_Nchirm6344UbJrFnEj8ky7hs8O42XLYCdIpi0bya91EgHWzt55ZL-Dag6-VLNrZeit0Vpm8mPBppAWc4etkQQYoZTb1NlQeFaLxBgjD8m7yGGam-0g72fEPoz-wONVr1GfRvhc9loTvWWpKc_4d-XCephzOKN6M-wQEkoKcBURQV90BPx3VJlHljR'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')