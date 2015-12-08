var ArcGIS = require('../lib/index')
// user token
var token = 'okOk9ZVAlx2_msS-wxIKcGbdqGj0XLDnoHdYRZ3ptv01ygoztJaEw-urlfh-w8SmLm19gGNQN6y-bC7-KjhPOHViBxcWh1zYh5hRptFZD1-yLDuyC4nh_R2M7wxm9X7lVRafeV-iMQXiNS8c8rjQCWYuESRqhqyTPgAm5FPY3XeZ4Cz0vgBR0SZvaSjRw-5Y'

var ago = ArcGIS({
  token: token
})

window.ago = ago

