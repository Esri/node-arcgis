/**
 * Takes a string designating an ArcGIS Usage Api Period and returns that number of milliseconds
 * @param {String} Period string (1d, 3d, 1w, 1m)
 * @returns {Number} The duration of that period in milliseconds
 */
let periodToMs = (period) => {
  let arr = period.split('')
  let unit = arr.pop()
  let num = arr.join('')
  if (unit === 'd') {
    return num * 8.64e+7
  } else if (unit === 'w') {
    return num * 6.048e+8
  } else if (unit === 'm') {
    return num * 2.628e+9
  } else if (unit === 'y') {
    return num * 3.154e+10
  } else {
    return undefined
  }
}

module.exports = periodToMs
