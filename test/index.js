var ArcGIS = require('../lib/index')
// user token
var token = 'Me8POZJgER_sFYshVKyO7WYKnW91CpbIArGPeTvjblEw6E0MCVQZk9BxBbHunpmTQn5S8X9EMud518FjHd-F8KUGOqefY9cwkQTsHtZM1Kj_wPfEYDE1vwf_nLtrdzkW2eLwxRCN9NavBnKYSLgoxOU4AG69Amm-O2wucTo98JP1K85b6vwfkAOfLUjy7Hty'

var ago = ArcGIS({
  token: token
})

window.ago = ago

