// This figures out if we want to return a Promise, or use a callback.

module.exports = function (promise, cb) {
  if (cb) {
    return promise.then(function resolve (results) {
      if (!results.error) {
        return cb(null, results)
      } else {
        var error = new Error(results.error.message)
        return cb(error)
      }
    }).catch(cb)
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
