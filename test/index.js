var ArcGIS = require('../lib/index')
// user token
var token = 'uW0J8MSEtw93Gk8jdbMp8WjeCMxz1Ez-dwsepyIweYrR-DWM8USJiORWanyyrTI-Uvc1YVe6h_dM50hk3F5WHot26gN28B23RFoyblcg8WZluk5mSYZECkdDksjhFd7uzH4I5eMJrNIbvPS004RQuzeWGuMO7GPysRZ3Lhy-_5UQhCWN6FZHtlYTcTMUR4kQ'

var ago = ArcGIS({
  token: token
})

window.ago = ago

