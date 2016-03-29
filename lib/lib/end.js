// This figures out if we want to return a Promise, or use a callback.

module.exports = function (promise, cb) {
  if (cb) {
    promise.then(function resolve (results) {
      if (!results.error) {
        return cb(false, results)
      } else {
        var error = new Error(results.error.message)
        return cb(error)
      }
    })
    .catch(function resolve (error) {
      return cb(error)
    })
  } else {
    return promise
    .then(function resolve (results) {
      if (!results.error) {
        return results
      } else {
        var error = new Error(results.error.message)
        throw error
      }
    })
  }
}
