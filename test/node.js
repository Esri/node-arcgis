console.log('ping')

var token = "NyxlTE4AUBGKKHVhneph0W697Iv6Z8f9MgGv1W6NugrSR_pIij5vHdZvcm_45PE2GOqLwmC0x7pkRcQ5ySW0x8XRh5IXnJNAbwnQgUgTo-AEZzkDAlkMOjB1wB5ZseeugzkDO4btlBxa-HHUj1wyrk7pjIAOrQn54inBntL4DUI1oWEIa1w5gfTjAq_pI-0j"

var Arcgis = require('../dist/node/index')

var ago = Arcgis({token: token})
console.log(ago)

var nk = ago.user('nikolaswise')
console.log(nk)

nk.get()
.then(function(r) {
  console.log(r)
})

console.log('end')
