var ArcGIS = require('../lib/index')
// user token
var token = 'XP-SgwoFOmrHQAa_sTHzNzWQw5hU5JAF6K_YKF14gUaM4GHyWpMkKC5t-68f5dkH7CN5M-LradtpVOrGgycqduEFQGOgAgBMHjXpsnhLyzBKYVEKYDc5RKR2rJ0r2zzTQn3oI8wkkuWoBpH_4DOg534KRRCIMhr3EMHoTHmq3ICbK_C1s40RnvpWSl4sOJ-p'

var ago = ArcGIS({
  token: token
})

window.ago = ago

