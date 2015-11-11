var ArcGIS = require('../src/index')
// user token
var token = 'Bk8hbsWOruYTfX6uXwE1UvNW4ZiadyetDgl5qFH_f6gY9dIf8B5ZKwxnRJmMnTfw2ESxAS3As2KD-Vxb0y2hRXF33u8PXOYhR0Hg77xMi64i4N9ALPV6J_a-QaCoI4m4UE2UgbLIeCgW7eaNo93Oxmzb6fc1GLdrzrDsWGyRHYbq6z9PAubQ11UEuUjAeu5-'

var ago = ArcGIS({
  token: token
})

window.ago = ago

window.nk = window.ago.user('nikolaswise')