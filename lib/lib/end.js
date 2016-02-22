// This figures out if we want to return a Promise, or use a callback.

export default function end(promise, cb) {
  if (cb) {
    return promise.then(functin (results) {
      return cb(null, results)
    }).catch(cb)
  } else {
    return promise
  }
}
