var ArcGIS = require('../lib/index')
// user token
var token = '7G4dfp3P7KSzd0eTJBYUN4Johe1SoqUUychQnZKle8wMtwJhzZLwTbCPRc1RB4mqvNIKNY0aWEk6fiwf34ACBsv8k4znGyG9cMj1Z7WPK6W33LxIdfQjlLK7ys7DDGh5lAUVai3QDNVGa3K-Hm8q13yXmFI7_YQpL6Rx9LHBqtb29P3olcrwC_pZXTpG1R4q'

var ago = ArcGIS({
  token: token
})

window.ago = ago

