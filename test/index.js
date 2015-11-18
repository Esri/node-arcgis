var ArcGIS = require('../lib/index')
// user token
var token = 'Jr7BiVV8xVU3PKSLQIOBL48Nlr-wao5RZ2Lv2r5XM50w-7pJWa1OSW4wS9IgbJD8lqlDblmi4im4d-pzziMEDg0rHJOTjKyr8OUac-2IlVs80DezGatOQTNeafSJHNua1VPYhp7sID_Y3XqeUzmTU5ObduG5cAb1O3bbykahWUk_4sswCbNShJquUWh_sAYX'

var ago = ArcGIS({
  token: token
})

window.ago = ago

