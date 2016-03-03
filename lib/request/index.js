var fetch = require('isomorphic-fetch')

/**
 * Simple request module using fetch
 * unimorphic isorequest nodularified for REPL and BROWSER
 */

let rq = {
  encodeForm: (form = {}) => {
    return Object.keys(form).map((key) => {
      return [key, form[key]].map(encodeURIComponent).join('=')
    }).join('&')
  },
  /**
   * Simple GET request to url, returns a promise
   * @param {String} url
   * @param {Object} form Form data appended to url as form encoded query strings
   * @returns {Promise} Response body (parsed as JSON if application/json content-type detected)
   */
  get: (url, form = {}) => {
    form = rq.encodeForm(form)
    return fetch(`${url}?${form}`, {method: 'GET'})
      .then(function (response) {
        return response.json()
      })
  },

  /**
   * Simple POST request to url, returns a promise
   * @param {String} url
   * @param {Object} form Form data appended to url as form encoded query strings
   * @returns {Promise} Response body (parsed as JSON if application/json content-type detected)
   */
  post: (url, form = {}) => {
    form = rq.encodeForm(form)
    return fetch(`${url}?${form}`, {method: 'POST'})
      .then(function (response) {
        return response.json()
      })
  }
}

module.exports = rq
