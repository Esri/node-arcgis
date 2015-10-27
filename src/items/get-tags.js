var uniq = require('../lib/uniq')
/**
 * Gets unique tags from a group of items.
 * @param {Array} Array of Item objects
 * @returns {Array} Array of tag strings
 */
let getTags = items => {
  let tags = items.reduce(function (prev, current) {
    return prev.concat(current.tags)
  }, [])
  return uniq(tags)
}

module.exports = getTags