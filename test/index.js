var ArcGIS = require('../lib/index')
// user token
var token = 'MegHBNBqQv3zKWaUYIS_KisX9aj7Lm94GMWBrmt5zhTBsmxceBbE6R4vKLtQoMzEmb8LQnXX77yUN6MK2TITrFtBlm6E_ezb0IgmwYGuhUT9Tz-GQe_koNwKANPGUZUKH7d-FJa9mBF7idBaY561LbSCYFWfJmjiAPVAsk9wtNhNl2_4FThfLNJuKraSENAu'

var ago = ArcGIS({
  token: token
})

window.ago = ago

