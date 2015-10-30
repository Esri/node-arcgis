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
    getUser: function() {console.log('gets a user')},
    user: {
      create: function(){console.log('creates a new user via an inivtation?')},
      update: function(){console.log('updates the user information')},
      getContent: function() {console.log('gets all content owned by a user')},
      getTags: function(){console.log('returns the users tags?')},
      delete: function(){console.log('deletes a user')},
      enable: function(){console.log('enables a disabled user')},
      disable: function(){console.log('disables a user')}
    },
    getOrganization: function() {console.log('gets an organization')},
    organization: {
      update: function () {console.log('updates org information')},
      getUsers: function() {console.log('gets users in an org')},
      getContent: function() {console.log('gets content in an org')},
      getSummary: function() {console.log('gets the short summary of an org')},
      deleteUsers: function () {console.log('deletes users from an org')}
    },
    getGroup: function() {console.log('gets a group')},
    group: {
      update: function(){console.log('updates group information')},
      getContent: function() {console.log('gets the content in a group')},
      getUsers: function(){console.log('returns users in a group')},
      addUser: function(){console.log('adds a user to a group, via invitation if needed')},
      removeUser: function(){console.log('kicks a user out of a group')},
      join: function(){console.log('rquest an invitation for a user to a group')},
      leave: function(){console.log('leave a group')},
      newGroup: function(){console.log('creates a new group')},
      deleteGroup: function(){console.log('deletes a group')},
      changeOwner: function(){console.log('changes the owner of a group?')}
    },
    getItem: function() {console.log('gets an item')},
    item: {
      new: function(){console.log('creates a new item')},
      delete: function(){console.log('deletes an item')},
      update:  function () {console.log('updates an items information')},
      createService: function(){console.log('Creates a new feature service for hosted data?')},
      addComment: function(){console.log('adds a comment to the item, if possible')},
      addToFolder: function () {console.log('adds item to a folder')},
      addToGroup:  function () {console.log('adds item to a group')},
      removeFromGroup:  function () {console.log('adds item to a group')},
      changeOwner:  function () {console.log('changes the owner of an item')},
      favorite: function () {console.log('adds item to favorites')},
      currentRating: function () {console.log('gets current item rating')},
      rate: function () {console.log('adds rating to item')},
      unrate: function(){console.log('removes rating from an item')},
      publish: function () {console.log('publishes a static data item to a usable layer')},
      export: function(){console.log('exports item as selected data type')},
      getComments: function(){console.log('returns all comments on an item')},
      getData: function(){console.log('gets the data behind an item')},
      deleteProtected: function () {console.log('sets delete protection status')},
      register:  function () {console.log('registers an item as an application')},
      getOAuth:  function () {console.log('returns oauth information for an app')},
      getRelatedItems:  function () {console.log('returns items related to an item')},
      setPermissions: function () {console.log('sets permissions on an item to self, org, or public')},
      comments: {
        get: function(){console.log('returns a particular comment on an item')},
        add: function(){console.log('adds a comment to the item, if possible')},
        edit: addToGroup:  function () {console.log('edit the content of a comment')},
        delete: function(){console.log('deletes a comment from the item')}
      }
    },
    getFavorites: function () {console.log('get the current users favorites')},
    items: {
      addToFolder: function () {console.log('adds items to a folder')},
      newFolder: function(){console.log('creates a new folder?')},
      deleteFolder: function(){console.log('deletes a folder and its contents')},
      delete: function(){console.log('Deletes a set of items')},
      getTags: function() {console.log('gets all the tags in an array of items')}
    },
    getUsage: function() {console.log('gets usage information')},
    usage: {
      getSummary: function() {console.log('gets a summary of org usage')},
      stypeToService: function() {console.log('turns usage types into human readable words')},
      parseProduct: function() {console.log('figures out what usage api is trying to tell you')},
      flatten: function() {console.log('squishes response from usage api into graphable data')},
      periodToMs: function() {console.log('figured out what a reporting period even is')}
    },
    getBilling: function() {console.log('gets billing information')},
    billing: {
      status: function(){console.log('checks status of billing')}
    },
    search: function(){console.log('does a search thingy')}
  }
  return ago
}

module.exports = client
