var ArcGIS = require('../lib/index')
// user token
var token = 'UTD9kxIdz_g18U7OZMyV_3YX2bndlY4bN4uOSUqXawKApN5NIm9NgJDZ3-R6Fse5Tz2vWJGsvlMrl53FLc1JBysfnRtOhJ8jg_6yIKHd3GLtdCO47ljpuM8zqVCpiBurmMTI0zUI4w4yOpPMnOx4FydiVZbY1Rwj3B_Ad2HObKShmptivFdPUkmhZwTfHhPy'
var ago = ArcGIS({
  token: token
})

window.ago = ago

