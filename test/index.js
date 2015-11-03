var ArcGIS = require('../src/index')
var token = 'm93E6-E0x5MoPTQyvhgG4FCeQKz8syPkT23dWiYaZQDO5YTQXcfN4T7Nj968VH20py8KzMNd3c5lfHmrLr-dVvaeDiehDz7LFOR7oq5no-gHGond8mtymIBErzHlqAXhDxA_E0vT0pkrb_pdZj-xiw3DqlgZVYJ4LNB4gUhegtXJs-DLKZR0BBxr0axaB9No'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')