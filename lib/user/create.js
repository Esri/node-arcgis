import end from '../lib/end'

export default function CreateUser (arcgis) {
  return function create (options, cb) {
    var createPromise = arcgis.request({
      url: 'portals/self/invite',
      form: options,
      post: true
    })
    return end(createPromise, cb)
  }
}
