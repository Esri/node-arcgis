var test = require('tape')
var end = require('../lib/lib/end')

function pass () {
  return new Promise(function (resolve, reject) {
    return resolve('Success')
  })
}

function fail () {
  return new Promise(function (resolve, reject) {
    return reject('Error')
  })
}

function esriFail () {
  return new Promise(function (resolve, reject) {
    return resolve({
      error: {
        message: 'Fail'
      }
    })
  })
}

test('End function processes successful resolution', function (t) {
  t.plan(1)
  var promise = pass()
  end(promise).then(function (msg) {
    t.equal(msg, 'Success')
  })
})

test('End function processes successful rejection', function (t) {
  t.plan(1)
  var promise = fail()
  end(promise).catch(function (msg) {
    t.equal(msg, 'Error')
  })
})

test('End function processes Esri Failure', function (t) {
  t.plan(1)
  var promise = esriFail()
  end(promise).catch(function (err) {
    t.throws(err)
  })
})

test('End function with callback resolves properly', function (t) {
  t.plan(2)
  function cb (err, results) {
    t.error(err)
    t.equal(results, 'Success')
  }
  var promise = pass()
  end(promise, cb)
})

test('End function with callback rejects properly', function (t) {
  t.plan(2)
  function cb (err, results) {
    t.ok(err)
    t.notOk(results)
  }
  var promise = fail()
  end(promise, cb)
})

test('End function with callback rejects esri failure properly', function (t) {
  t.plan(2)
  function cb (err, results) {
    t.ok(err)
    t.notOk(results)
  }
  var promise = esriFail()
  end(promise, cb)
})

