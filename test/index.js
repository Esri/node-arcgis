var ArcGIS = require('../lib/index')
// user token
var token = 'kiggNVka9n91SCUNfg3YBQpPFu6_YR0kS3lhgmZJs-foBcgr1lxuZN9_kRZOXXwtdKAVFmb8IT0_HwEGwa2dWs6qzFPspB-haZxY3KZr9qj4JWHPYw2aAOaoBQQV_83fIeZullmDiIyRSI2EB7Q9HVLlh11vr0hWsyU64TlVN1H8uoYcfg4t-2153qYYVo_H'

var ago = ArcGIS({
  token: token
})

window.ago = ago

