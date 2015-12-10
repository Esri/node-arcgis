var ArcGIS = require('../lib/index')
// user token
var token = 'iCAdCngBTFXKkQkUb8cFUk42S1-qOxKto7cfGIA1IvoVLxIwcRhunXxHBNng_ZgAuLEkjae8ji_bUIEWrMIH9D4aXXzcGk_u8_DfeWrt0uwLr3OlTtrwGw1iqTrhmvb3K8wjbdkn7HmVm6X2OdVqlpK2bRAlYLtXcg3qtoLqfwFGT9YvBmwzDAT8GSOebmhp'

var ago = ArcGIS({
  token: token
})

window.ago = ago

