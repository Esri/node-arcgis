var ArcGIS = require('../lib/index')
// user token
var token = 'vVqiJyAUmQAFAktbkYhMkwJwJY6iubq51iJLjUdCkfzgXtxAAqKemcQu1cpaDdCaLVHEditpa2PF5HQxlBf2zjf4HjSu8jMngMp40i0m5TjevhDyNf9afLL2uaTN6bjWX5k7Uk-3mgZThGnbZlpV2GHLssFyOGXZh9W0Ctd9w7LSsGVU-GnXt1I44Gw2G9Hh'
var ago = ArcGIS({
  token: token
})

window.ago = ago
