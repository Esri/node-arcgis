var ArcGIS = require('../lib/index')
// user token
var token = 'baykthvbxTZJ59HbYZoJ2KHeFukaGB7gyx6DneIsv3OL_-CxhKDqLQO8jevdIbLTmuEFoWXKmR9dzZvUXgTISrgF9eQXXf58dYTLhYcPJxLyZ-B0guJl4ZRiOA7uAyrUawKWqIbq3RZaRjT_GInfHO7Tl_T1HYapwYFf5J1BpqmGpR8HFkQyzwsNlgGAFrlw'

var ago = ArcGIS({
  token: token
})

window.ago = ago

