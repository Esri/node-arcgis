var ArcGIS = require('../lib/index')
// user token
var token = '0aNOLhXZHTkgIajYytcID4QAEigs5M8B3fvFmjFbl78atxWgh4-BXhVHJgrxK_BrO1kvGV3YbadziB3B4jLA0bCzUDkfBvq5mYV-e-r61EtW0La6IashIqzjvtlDtmXsRzH3jT6QdwXEtsK1xaComomb7GWG_y2sgLTt7vd9wyC7rrhvBpzMyg91E29ZZVqA'
var ago = ArcGIS({
  token: token
})

window.ago = ago
