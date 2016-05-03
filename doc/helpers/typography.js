var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
})
  .use(require('markdown-it-highlightjs'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-anchor'), {
    permalink: true
  })

var typeset = require('typeset')

module.exports = function (site, cb) {
  site = site.map(function (page) {
    if (page.isMarkdown) {
      page.content = md.render(page.content)
    }
    page.content = typeset(page.content)
    return page
  })
  cb(null, site)
}
