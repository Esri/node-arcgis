/**
 * Wrapper for arcgis api
 */
 var rq = require('./rq')
 var uniq = require('./uniq')

/**
 * Sets up a new arcgis client
 * @param {String} Valid Token
 * @returns {Object} Object with methods for necessary routes
 */
let client = token => {
  let ago = {
    /* Automatically add client id, base url */
    request: (url, form = {}) => {
      form.token = token
      form.f     = 'pjson'
      return rq.get(`http://www.arcgis.com/sharing/rest/${url}`, form)
    }
  }
  return ago
}