console.log('ping')

var token = 'Ih-VSTe01oOvwZqb2lCGvphHw8WMet0WtPMHFtiRgpvtTBTsghKQsSbeulv3j_3CCxSW1A8MXfQpw4VIZ8KEo1ZtWNdqxSSwhgwzSHTRaPgNWXi0NOjtrWRsw3CNkElj9dNJSnFhar3P_YPPvMVxH-vQUW7g9QDQxbeOE7kK42Y5Yo1XSSgENWcJxr3NTQKp'

var Arcgis = require('../dist/node/index')

var ago = Arcgis({token: token})
console.log(ago)

var nk = ago.user('nikolaswise')
console.log(nk)

nk.get()
  .then(function (r) {
    console.log(r)
  })

console.log('end')
