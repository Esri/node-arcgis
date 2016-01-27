var ArcGIS = require('../lib/index')
// user token
var token = 'Wp-AWziHUtgiguboGnHNxx5xkL4HSlbrD120V2oCU2v-9p4zI2q6n3YtbIce93eSxV8hQGbPGhYogQurcMXNcF6FyKlKhKga9sYbIiS3r1704gmTPE7WCUXJjMRmDeLt7KZJIV6ENWAkPUm6vqL1avBWCEziI4AB92b363B4V_OphDAXv-bJ4y4Ge6zRxIJ8'
var ago = ArcGIS({
  token: token
})

window.ago = ago
