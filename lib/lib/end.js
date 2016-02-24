// This figures out if we want to return a Promise, or use a callback.

module.exports = function (promise, cb) {
  if (cb) {
    return promise.then(function (results) {
      return cb(null, results)
    }).catch(cb)
  } else {
    return promise
  }
}
