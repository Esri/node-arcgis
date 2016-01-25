var ArcGIS = require('../lib/index')
// user token
var token = 'TTiQCOyMMplrDQf8gKLkNSLzqM2cGDUZooQu3L77Jgi7bqhG0Ez4jKZQdjjTNAKJbkfPj5r5DzuW2-K-EvRY0QB3uJLqQg1QxtwsX-ENtoVjzr-YN0BtM1llHkKvg12AO4UmXbOH0Y78bMMeCWVNURqwzpz5jSxoaMGnRQ88Z0crC3QsC-e77lgUhXX3VkK8'
var ago = ArcGIS({
  token: token
})

window.ago = ago
