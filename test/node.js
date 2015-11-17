console.log('ping')

var Arcgis = require('../dist/node/index')

var ago = Arcgis('AawqwlEcFP4Uvamy-TKb2j9euXc0SYnCoFQ7Q5VLuz0IUUdZikHblDN5XkOrj6NAeHhLE3IWlpQsRC8Qg1Kt1C2MQeJ3qRUcfAwyC-X_gzGnaIgA2w_NvM-m2sxDqt_fM_SUnRu0lR4QhfJKWB8gzpOeLpVpxqKPhUvkOAwR55CRHG9kAC9d6lFgwVPzeTNI')
console.log(ago)

var nk = ago.user('nikolaswise')
console.log(nk)

nk.get()
.then(function(r) {
  console.log(r)
})

console.log('end')