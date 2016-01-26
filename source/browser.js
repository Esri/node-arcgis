var ArcGIS = require('../lib/index')
// user token
var token = '1faN7XUGnO9aMSOBxCFOLjQa3OVR5um9lsbscnbr2RD80-56HKhtotwzu3rz7s13Y3RJlZeLV0E7S2bjm2FLL3KeMyBQMrGluzCcGS45dE7U91woOAb4bIbNUnxR5EOvnPQNxIs8ELijj6XhgMmJGelPXxjZoh0YRLpxnup-8lUsilM6WXczm9HqW694Wa3A'
var ago = ArcGIS({
  token: token
})

window.ago = ago
