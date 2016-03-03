import end from '../lib/end'

export default function CreateUser (arcgis) {
  return function create ({} = {} , cb) {
    var options = {

    }
    var createPromise = arcgis.request({
      url: `portals/self/incite`,
      form: options,
      post: true
    })
    return end(createPromise, cb)
  }
}
