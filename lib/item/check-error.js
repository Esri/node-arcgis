export default function (response) {
  if (response) {
    if (response.length) {
      response.forEach(function(r){
        if (response.error) {
          throw response.error
        }
      })
    }
    if (response.error) {
      throw response.error
    }
  }
}