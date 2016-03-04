let uniq = function (a) {
  var seen = new Set()
  return a.filter(function (x) {
    return !seen.has(x) && seen.add(x)
  })
}

module.exports = uniq
