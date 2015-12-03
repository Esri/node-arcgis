var ArcGIS = require('../lib/index')
// user token
var token = 'qtTfLu1g4l7LlOiBnwynjNuMIQGnDV1UDBsGDABsC28BtMJ4QhRw3-O7Ztao5P98jykUXTIt82Vg3gtTcZFUKhUrHA5I6nxG0HXxQXdzInMXE4sjDKloNy4f9_bXdqy7nHdP2q3Qkd2-8J2g7BouDJWA-ByUflF3Xa2lM2gRazqeyP_1tE92BsR21RyRlYh6'

var ago = ArcGIS({
  token: token
})

window.ago = ago

