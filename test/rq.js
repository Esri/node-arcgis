var test = require('tape')
var rq = require('../lib/lib/rq')

test('Rq is an object with encode, get, and port methods', function (t) {
  t.plan(3)
  t.ok(rq.encodeForm, 'Encode form method exists')
  t.ok(rq.get, 'Get form method exists')
  t.ok(rq.post, 'Post form method exists')
})

test('Rq.encodeForm turns object into query params', function (t) {
  t.plan(1)
  var form = {
    foo: 'bar',
    baz: 'qux'
  }
  var expected = 'foo=bar&baz=qux'
  t.equals(rq.encodeForm(form), expected, 'Form encoding properly')
})

