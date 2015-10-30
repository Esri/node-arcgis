let client = token => {
  let ago = {
    /* Automatically add client id, base url */
    /**
     * Sets ups base request to ArcGIS
     * @param {String} URL to append to root URL
     * @param {Object} Options to pass as query parameters
     * @returns {Promise} On resolution will return results
     */
    request: (url, form = {}, rootUrl = 'http://www.arcgis.com/sharing/rest/') => {
      if (!form.public){
        form.token = token
      }
      form.f     = 'pjson'
      return rq.get(`${rootUrl}${url}`, form)
    },
    getUser: function(options) {console.log('gets a user')},
    user: {
      new: function(options){console.log('creates a new user via an inivtation?')},
      update: function(options){console.log('updates the user information')},
      delete: function(){console.log('deletes a user')},
      content: function() {console.log('gets all content owned by a user')}
      tags: function(){console.log('returns the users tags?')},
      enable: function(){console.log('enables a disabled user')},
      disable: function(){console.log('disables a user')}
    },
    getOrganization: function(options) {console.log('gets an organization')},
    organization: {
      update: function(options) {console.log('updates org information')},
      users: function() {console.log('gets users in an org')},
      content: function() {console.log('gets content in an org')},
      summary: function() {console.log('gets the short summary of an org')},
      deleteUsers: function (options) {console.log('deletes users from an org')}
    },
    getGroup: function(options) {console.log('gets a group')},
    group: {
      new: function(){console.log('creates a new group')},
      update: function(options){console.log('updates group information')},
      delete: function(){console.log('deletes a group')},
      content: function() {console.log('gets the content in a group')},
      users: function(options){console.log('adds a user to a group, via invitation if needed. If options is null, returns users in a group')},
      removeUser: function(options){console.log('kicks a user out of a group')},
      join: function(options){console.log('request an invitation for a user to a group')},
      leave: function(options){console.log('leave a group')},
      changeOwner: function(){console.log('changes the owner of a group?')}
    },
    getItem: function(options) {console.log('gets an item')},
    item: {
      new: function(){console.log('creates a new item')},
      update:  function(options) {console.log('updates an items information')},
      delete: function(){console.log('deletes an item')},
      createService: function(options){console.log('Creates a new feature service for hosted data?')},
      addToFolder: function (options) {console.log('adds item to a folder')},
      addToGroup:  function (options) {console.log('adds item to a group')},
      removeFromGroup:  function (options) {console.log('adds item to a group')},
      changeOwner:  function (options) {console.log('changes the owner of an item')},
      favorite: function () {console.log('adds item to favorites')},
      currentRating: function () {console.log('gets current item rating')},
      rate: function () {console.log('adds rating to item')},
      unrate: function(){console.log('removes rating from an item')},
      publish: function () {console.log('publishes a static data item to a usable layer')},
      export: function(){console.log('exports item as selected data type')},
      data: function(){console.log('gets the data behind an item')},
      deleteProtected: function () {console.log('sets delete protection status')},
      register:  function () {console.log('registers an item as an application')},
      oAuth:  function () {console.log('returns oauth information for an app')},
      relatedItems:  function () {console.log('returns items related to an item')},
      permissions: function (options) {console.log('sets permissions on an item to self, org, or public. If options is null, returns current permissions')}
      comments: {
        all: function() {console.log('returns all comments on an item')},
        get: function(options){console.log('returns a particular comment on an item')},
        add: function(options){console.log('adds a comment to the item, if possible')},
        edit: addToGroup:  function (options) {console.log('edit the content of a comment')},
        delete: function(){console.log('deletes a comment from the item')}
      }
    },
    getFavorites: function () {console.log('get the current users favorites')},
    items: {
      addToFolder: function (options) {console.log('adds items to a folder')},
      newFolder: function(options){console.log('creates a new folder?')},
      deleteFolder: function(){console.log('deletes a folder and its contents')},
      delete: function(){console.log('Deletes a set of items')},
      getTags: function(options) {console.log('gets all the tags in an array of items')}
    },
    getUsage: function() {console.log('gets usage information')},
    usage: {
      getSummary: function() {console.log('gets a summary of org usage')},
      stypeToService: function(options) {console.log('turns usage types into human readable words')},
      parseProduct: function(options) {console.log('figures out what usage api is trying to tell you')},
      flatten: function(options) {console.log('squishes response from usage api into graphable data')},
      periodToMs: function(options) {console.log('figured out what a reporting period even is')}
    },
    getBilling: function(options) {console.log('gets billing information')},
    billing: {
      status: function(){console.log('checks status of billing')}
    },
    search: function(options){console.log('does a search thingy')}
  }
  return ago
}

module.exports = client
