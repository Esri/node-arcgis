var ArcGIS = require('../src/index')
// user token
var token = 'PjUeEPktOJF_afY_K5W7yPYZhsil5fOyKWtaJY0ZDPPHgX2w6eO4gJZD1VMC4Y7luCWOBG5uP8lH7bCHd4KxR2biKT8spU6xIH7ihePqiX8pTBGVpBgedjv-oYe42GQhVaVxeRftHn6uAyvFmjma2Xc9fTJJ_1Cylk_TUNyDxrIST0NzGLhQmVf0osz12aH6'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')