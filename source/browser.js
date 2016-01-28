var ArcGIS = require('../lib/index')
// user token
var token = '2DPF1Zj5tfcRe0OtHq3fH5KTM6uShngb_rdfyZNUi8xZ31dc3i8M4ZFoetekEy9vT7EMQxFvBntpIINWIGRYPE2HYAJ6m7LfMYkMRvuZzEhTH71OjL4hDSXPWQa8mGyv56TiRpMaFKrLj6nVhnP8Xt5aPkrwXTEEjCyDIJ2mXf29pfn3xAoy5ZLUXmD9W9jh'
var ago = ArcGIS({
  token: token
})

window.ago = ago
