---
reference:
  - title: "Library Methods"
    sections:
       - title: ArcGIS
       - title: Request
       - title: Search
  - title: "Platform Management"
    sections:
      - title: User
        methods:
          - Update
          - Content
          - Tags
          - Favorites
          - Enabled
          - Delete
      - title: Organization
        methods:
          - Update
          - Members
          - Content
          - Featured
      - title: Group
        methods:
          - Update
          - Content
          - Members
          - RemoveUsers
          - AddUsers
          - InviteUsers
          - Join
          - Leave
          - ChangeOwner
          - Delete
          - Create
  - title: "Items"
    sections:
      - title: Item
        methods:
          - Create
          - Update
          - Permissions
          - Rate
          - IsFavorite
          - Favorite
          - Groups
          - ChangeOwner
          - DeleteProtected
          - Delete
      - title: Layer
        methods:
          - Data
          - Export
      - title: Map
        methods:
          - Layers
      - title: Application
        methods:
          - Register
          - GetOAuth
          - GetToken
      - title: File
        methods:
          - Publish
          - Download
---

The basic structure of the ArcGIS Platform is an [organization](#organization) with a number of [users](#user). Each [user](#user) can own a number of [items](#item). [Items](#item) come in four basic types - [layers](#layer), [maps](#map) [applications](#application), and [files](#file). [Items](#item) can be collected together into [groups](#group), regardless of what [user](#user) or [organization](#organization) they are associated with. [Groups](#group) can include a number of [users](#user), who than have access to that [groups](#group) [items](#item).

All methods in the library besides the initial `Arcgis()` function return a Promise by default. However, one can also use callbacks by passing a function as the last parameter on each method. For example, getting an [item](#item) by ID can be done in two ways:

```
arcgis.item('id').then(cb)
// or
arcgis.item('id', cb)
```

***

# ArcGIS

> There are a number of ways to authenticate with the platform - which include support for federated accounts and things like that. If you need anything other than a token, open an issue. We'll get there!

Initialize the client library session to access the API either as an anonymous user, or as an authenticated member of an organization. Calling `ArcGIS()` with no parameters will set up an instance of the platform that talks to ArcGIS Online as a public, anonymous user.


**Params:** JSON Object with the following options;

| Options        | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| token          | String       | none                    |
| domain         | URL          | www.arcgis.com/         |

**Returns:** JSON Object with ArcGIS methods.

```
{
  request: Function,      // Makes requests to the domain
  search: Function,       // Queries the API
  user: Function,         // Interact with a user
  organization: Function, // Interact with an org
  group: Function,        // Interact with a group
  item: Function,         // Interact with an item
  layer: Function,         // Interact with an layer
  map: Function,          // Interact with an map
  application: Function,  // Interact with an application
  file: Function,         // Interact with an file
}
```

###### **Example**

> You can probably set up multiple of these suckers in one session to have access to public and private stuff at the same time.

```
var ArcGIS = require('arcgis')
// Create an anonymous session with www.arcgis.com
var anonAGO = ArcGIS()
// Create an authenticated session with www.arcgis.com
var authAGO = ArcGIS({
  token: token
})
// Creat an anonymous session with ArcGIS Server
var serverGIS = ArcGIS({
  domain: 'myGIS.myurl.com'
})
```

---

## request

> Request has a lot of functionality that I've been told we need, but I'm really not sure what any of it is. Right now, this bare-bones request works fine. We'll add more to it as needed.

Request uses information in the client to make calls to the API. It takes a url substring, a JSON object, and a boolean.

Request appends the URL to the clients domain and the omnipresent 'sharing/rest'. The JSON object gets processed into parameters. The boolean defines the request is GET (default, false) or POST (true). Request also appends the token that the current client session is authenticated with, and defines the response format as JSON.

Some services - like usage, analysis, things like that – require a different root URL, since they are an independent API.

**Parameters:**
Options Object

| Options | Type | Default |
| -- | -- | -- |
| url | String | / |
| form | Object | {} |
| post | Boolean | false |
| rootURL | String | `${domain}/sharing/rest` |

**Response:**
Promise that resolves to whatever the endpoint returns.


###### **Example**
```
arcgis.request()
.then( function (results) {
  // This calls the endpoint self, and returns a version number of the API.
  console.log(results)
})
```

---

## search

> this is growing in support as needed

Searches for [items](#item), [users](#user), and [groups](#group) within the platform.

**Params:**
Options object

| Option | Default | Description |
| --- | --- | --- |
| queryString | '\"\"'' | String, what to search for. Can be [complicated](http://doc.arcgis.com/en/arcgis-online/reference/search.htm). |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

**Results:**
Promise that resolves to a paginated search results Object

```
{
  nextStart: Number,  // if -1, there are no more results
  num: Number,        // Number of items per page returned
  query: String,      // The query string that got us here
  results: Array,     // An array of all the items that match the query
  start: Number,      // The index of the item that starts this batch of results
  total: Number,      // Total number of items that match the query
  pages: Number,      // How many pages of results there are
  currentPage: Number // Index of the current page
}
```


###### **Example**
```
var options = {
  queryString: 'owner:NikolasWise AND (type:"Feature Service")',
  num: 100
}
arcgis.search(options)
.then(function(results) {
  console.log(results)
})

```

---

## user

> Every method off `ArcGIS()` returns a promise, and involves making web requests to the domain.

This object is used to interact with a user - your own user account, other users in your organization, or publicly available users that are not associated with your organization. This method is also used to create new users by inviting them to your organization.

**Params:**
A username string

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Username       | String       | none                    |

**Returns:**
JSON user object with management methods.

```
{
  created: Date,            // when this user was created
  firstName: String,        // recorded first name of the user
  fullName: String,         // recorded name of the user
  lastName: String,         // recorded last name of the user
  provider: String,         // ???
  username: String,         // hard username for the user. Never changes.
// the following are not returned if the user is private
  email: String,            // email address of user
  culture: String,          // two letter lang code ex: 'en'
  description: String,      // text description set by the user
  privileges: Array,     // Strings that denote actions
  favGroupId: String,       // ID of user favorites group
  groups: Array,            // Group objects associated with the user
  orgId: String,            // ID of the org the user belongs too
  modified: Date,           // date when the user
  region: String,           // two letter country code ex: 'us'
  tags: Array,              // array of tags that user has used, with counts
  thumbnail: String,        // name of the users thumbnail image ex: 'coolguy.jpg'
  units: String,            // 'imperial' or 'metric'
  update: Function,         // updates the user information
  delete: Function,         // deletes a user
  content: Function,        // gets users content
  tags: Function,           // returns the users tags?
  enable: Function,         // enables a disabled user
  disable: Function,        // disables a user
}
```

###### **Example**

```
arcgis.user(username)
.then(function (user){
  console.log(user)
})
```

### user.update

Takes an options object, and sets the users information to the options provided. Returns an error, or the updated user object.

**Params:**
Options JSON Object

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| preferredView  | String | 'Web' / 'GIS' / 'null' |
| description    | String | Plain text description of the user. |
| thumbnail      | Path | The file to be used as the users profile image. |
| password       | String | Set the users password to the new string. |
| fullname       | String | The full name of the user. |
| email          | String | Email address to contact the user at. |
| culture        | String | Culture code for the user. |
| region         | String |  Region code for the user. |

**Returns:**
Promise that resolves to the updated [`user`](#user) object.

###### **Example**

```
arcgis.user(username)
.then(function (user) {
  var options = {description: 'just this person, you know?'}
  return user.update(options)
})
.then(function (user) {
  console.log(user)
})
```

### user.content

> This is _not_ using the user content method from the ArcGIS API. Instead, this is using a the [`search`](#search) method and pre-filling the parameters to locate the current user's content. This is done to have all content calls share response properties. The raw user content api call is the only call in the platform that does not return a paginated results object.

Returns an array of all of the users items and folders. If passed a folder id, will return an array of the items in that folder. These items have the same static properties as the results of [`item`](#item), but do not have methods attached to them.

**Params:**
Options Object

| Options         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

**Returns:**
Promise that resolves to a [`search` results object](#search).

```
{
  nextStart: Number,  // if -1, there are no more results
  num: Number,        // Number of items per page returned
  query: String,      // The query string that got us here
  results: Array,     // An array of all the items that match the query
  start: Number,      // The index of the item that starts this batch of results
  total: Number,      // Total number of items that match the query
  pages: Number,      // How many pages of results there are
  currentPage: Number // Index of the current page
}
```


###### **Example**
```
arcgis.user(username)
.then(function (user) {
  return user.content()
})
.then(function (results) {
  console.log(results)
})
```

### user.tags

All content has a set of tags associated with it. This call returns all the tags a user has applied to their content, with counts for the number of time each tag appears.

**Returns**
Promise that resolves to a JSON Object.

```
{
  tags: [
    {
      count: Number,
      tag: String
    }
  ]
}
```

###### **Example**
```
arcgis.user(username)
.then(function (user){
  return user.tags()
})
.then(function (tags) {
  console.log(tags)
})
```

### user.favorites

Users store their their favorite items in a group associated with their account. Getting a users favorites is similar to getting any other groups content.

**Params:**
Options Object

| Params         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

**Returns:**
Promise that resolves to a [`search` results object](#search).

```
{
  num: Number,       // Total number of items that could be returned
  total: Number,     // Total number of items in favorites
  query: String,     // Search string used to get these
  start: Number,     // Which item this page starts with
  nextStart: Number, // Which item next page starts with.
  results: Array     // Item objects
}
```

###### **Example**
```
arcgis.user(username)
.then(function (user) {
  return user.favorites()
})
.then(function (results) {
  console.log(results)
})
```

### user.enabled

Enables and disables the user within the organization. Passing no boolean to the method will return the current state of the user.

If a user is disabled, that means that their account is not active, but has not been deleted. A disabled user still counts towards your organizations maximum number of users.

**Params:**
Enabled

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| User Enabled   | Boolean      | none                    |

**Returns:**
Promise that resolves to the updated [`user`](#user) object.

###### **Example**

```
arcgis.user(username)
.then(function (user) {
  return user.enabled(false)
})
.then(function (user) {
  console.log(user)
})
```

### user.delete

Deletes the user. This cannot be undone.

**Returns:**
Promise that resolves to an confirmation object.

###### **Example**
```
arcgis.user(username)
.then(function (user) {
  return user.delete()
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### user.create

Creates a new user in your organization.

###### **Example:**

```
var options = {
}
arcgis.user.create(options)
.then(function (???) {
  console.log(???)
})
```

---

## organization

> Organizations are the central entities in the ArcGIS platform. All users belong to an Organization, even [developer accounts](http://developers.arcgis.com/plans), which belong to an organization with a single user.

This method is used to retrieve and interact with an Organization within the domains Portal - ArcGIS Online for example has many organizations that can be interacted with. An on-premises version of Portal or Server may have fewer, if not just one.

**Params:**
String of an Org Id.

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Org Id         | String       | self                    |

**Returns:**
Promise that resolves to the Org Object

```
{
  access: String,                  //
  availableCredits: Number,        //
  backgroundImage: String,         //
  created: Date,                   //
  culture: String,                 //
  defaultBasemap: Object,          //
  defaultExtent: Object,           //
  description: String,             //
  featuredGroups: Array,           //
  featuredGroupsId: String,        //
  helpBase: String,                //
  id: String,                      //
  ipCntryCode: String,             //
  modified: Date,                  //
  name: String,                    //
  region: String,                  //
  staticImagesUrl: String,         //
  subscriptionInfo: Object,        //
  supportsHostedServices: Boolean, //
  supportsOAuth: Boolean,          //
  thumbnail: String,               //
  units: String,                   //
  urlKey: String,                  //
  user: Object,                    //
  update: Function,                // Updates the orgs info
  members: Function,               // Gets all users in the org
  content: Function,               // Gets all content in the org
  featured: Function               // Gets the orgs featured items
}
```

###### **Example**

```
arcgis.organization()
.then(function (organization) {
  console.log(organization)
})
```

### organization.update

> All options that are settable with this method have yet to be fully plumbed.

Takes an op­tions ob­ject, and sets the organization's in­for­ma­tion to the op­tions pro­vided. Re­turns an er­ror, or the up­dated organization ob­ject.

**Params:**
Options JSON Object

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| name           | String,      | The character limit is 250. |
| access         | String,      | Setting to public allows anonymous users to|access your organization's custom URL. Setting to private restricts access|to only members of your organization. |
| description    | String, | Describes the organization. |
| summary        | String | Short description of the organization, less than 256 characters. |
| canSharePublic | Boolean,     | Allows members of the organization to share outside the organization |
| canSearchPublic| Boolean,     | Allows members of the organization to search outside the organization. |
| thumbnail      | String,      | Acceptable image formats are PNG, GIF, and JPEG |
| urlKey         | String,      | The prefix that will be used in the URL for this portal, for example, <urlkey>.maps.arcgis.com. |
| urlHostname    | String,      | A custom URL for this portal. |
| culture        | String       | The default locale (language and country)information. |

**Returns:**
Promise that resolves to the [`organization` object](#organization)

###### **Example**

```
arcgis.organization()
.then(function (organization) {
  var options = {description: 'We are super professional'}
  return organization.update(options)
})
.then(function (organization) {
  console.log(organization)
})
```

### organization.members

Gets the members within an organization. Takes a number, and returns as a paginated list with that number of members per page. Returns 100 members per page by default.

**Params:**
Options Object

| Options         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

> If the `nextStart` value is -1, that means your on the last page of the results. The objects returned in the `users` array are the same as in [`user.get()`](#userget)

**Returns:**
Promise that resolves to the [`organization` object](#organization)

```
{
  nextStart: Number,
  num: Number,
  start: Number,
  total: Number,
  users: Array
}
```


###### **Example**

```
arcgis.organization()
.then(function(organization) {
  return organization.members()
})
.then(function (members) {
  console.log(members)
})
```

### organization.content

Gets the items in an or­ga­ni­za­tion. Takes a num­ber, and re­turns as a pag­i­nated list with that number of items per page. Re­turns 100 items per page by de­fault, starting at the first page of results.

> This is a shortcut helper for the `search` method with the query needed to target an org predefined.

**Params:**
Options Object

| Options         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

**Returns:**
Promise that resolves to the [`search` results object](#search)

```
{
  nextStart: Number,
  num: Number,
  query: String
  results: Array,
  start: Number,
  total: Number
  pages: Number,
  currentPage, Number
}
```


###### **Example**

```
arcgis.organization()
.then(function (organization) {
  return organization.content()
})
.then(function(content) {
  console.log(content)
})
```

### organization.featured

Organizations can add items to a group that is for specially 'featured content', items that may be common or high-traffic within the organization. This group is displayed on the orgs home page.

Takes a number, and returns a paginated list of items within the organizations featured group.

> This method is the same as [`group.content()`](#groupcontent), but with the group id prefilled from the organizations profile.

**Params:**
Options Object

| Options         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

**Returns:**
Promise that resolves to the [`search` results object](#search)

###### **Example**

```
arcgis.organization()
.then(function (organization) {
  return organization.featured()
})
.then(function(featured) {
  console.log(featured)
})
```

---

## group

> In the ArcGIS platform, groups are used to aggregate users and content together. They can contain items and users from outside organizations, be authorized to access applictions and content purchased from [the marketplace](https://marketplace.arcgis.com/), and are used to manage things like user favorites and featured content.

This object us used to interact with a group. Any group that your user has permissions to access can be interacted with via this method. As with the [`user`](#user) object, calling this method with no parameters allows you to create a new group.

**Params:**
A group id string

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| GroupID        | String       | none                    |

**Returns:**
Promise that resolves to group object with management methods.

```
{
  access: String,           //
  capabilities: Array,      //
  created: Date,            //
  description: String,      //
  id: String,               //
  isFav: Boolean,           //
  isInvitationOnly: true    //
  isReadOnly: Boolean,      //
  isViewOnly: Boolean,      //
  modified: Date,           //
  owner: String,            //
  phone: String,            //
  provider: String,         //
  providerGroupName: String,//
  snippet: String,          //
  sortField: String,        //
  sortOrder: String,        //
  tags: Array,              //
  thumbnail: String,        //
  title: String,            //
  userMembership: {         //
    applications: Number    //
    memberType: String,     //
    username: String,       //
  }                         //
  update: function (),      // Updates the group information
  content: function (),     // Gets the content in the group
  members: function (),     // Gets the members in the group
  removeUsers: function (), // Remove a member from the group
  addUsers: function (),    // Add a member to the group
  join: function (),        // Submit a request to join the group
  leave: function (),       // Leave the group
  changeOwner: function (), // Reassign the owner of the group
  delete: function ()       // Delete the group
}
```

###### **Example**

```
arcgis.group(id)
.then(function(group) {
  console.log(group)
})
```

### group.update

Updates the information for a group.

> Updatable params are still TBD

**Parameters:**
JSON Options Object

**Returns:**
Promise that resolves to updated [`group` object](#group)

###### **Example**
```
arcgis.group(id)
.then(function (group) {
  return group.update({ title: "My New Group Name" })
})
.then(function (group) {
  console.log(group)
})
```

### group.content

> This item results object is similar to a [search](#search) results object.

Gets the items that are aggregated with in the group.


| Options         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

**Returns:**
Promise that resolves to JSON [earch results](#search) Object

```
{
  nextStart: Number,
  num: Number,
  query: String
  results: Array,
  start: Number,
  total: Number
  pages: Number,
  currentPage, Number
}
```


###### **Example**
```
arcgis.group(id)
.then(function (group) {
  return group.content()
})
.then(function (content) {
  console.log(content)
})
```

### group.members

> This item is not paginated, not similar to a search results object. Comme se, comme ca I guess.

Gets the users within a group, along with the groups owner and an array of group admins. It does not take params. Unknown why this is different, just one of those things.

**Returns:**
Promise that resolves to a JSON Object

```
{
  admins: Array
  owner: String
  users: Array
  length: Number
}
```


###### **Example**

```
arcgis.group(id)
.then( function (group) {
  return group.members()
})
.then(function (members) {
  console.log(members)
})
```

### group.removeUsers

> [`addUsers`](#groupaddusers), [`inviteUsers`](#groupinviteusers), and [`removeUsers`](#groupremoveusers) can all accept an array of usernames, or a single username as a string.

Removes one or more users from the group.

**Params:**
Array of username strings.

**Returns:**
Promise that resolves to a JSON Object
```
{
   notRemoved: Array // If any users couldn't be removed, thats noted here.
}
```


###### **Example**
```
var group = arcgis.group(id)
.then(function (group) {
  return group.removeUsers(['userOne', 'userTwo'])
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### group.addUsers

Users can be added to a group. The groups administrators and owner can add any user to the group. Members without this access can only add other members within the same organization to the group.

**Params:**
Array of username strings

**Returns:**
Promise that resolves to a confirmation JSON Object

```
{
  success: true,
  groupId: id
}
```

###### **Example**
```
var group = arcgis.group(id)
.then(function (group) {
  return group.addUsers(['userOne', 'userTwo'])
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### group.inviteUsers

Users can be invited to join a group. This method sends an email to the address on record for the users given. All users in a group can invite other users.

**Params:**
JSON Options object

> You cannot put an arbitrary number of minutes in for expiration. It must be one of the values in description.

| Options         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| users | [] | Users to invite to group via email |
| role | 'group_member' | 'group_member' or 'group_admin' |
| expiration |  1440 | Expiration date on the invitation can be set for one day, three days, one week, or two weeks, in minutes. |

**Returns:**
Promise that resolves to a confirmation JSON Object

```
{
  success: true,
  groupId: id
}
```


###### **Example**
```
var group = arcgis.group(id)
.then(function (group) {
  return group.inviteUsers({users: ['userOne', 'userTwo']})
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### group.join

Creates a request to join a group for the currently authenticated user.

**Returns**
Promise that resolves to a confirmation JSON Object

```
{
  success: true,
  groupId: id
}
```

###### **Example**

```
arcgis.group(id)
.then(function (group) {
  return group.join()
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### group.leave

Removes the currently authenticated user from the group.

**Returns**
Promise that resolves to a confirmation JSON Object

```
{
  success: true,
  groupId: id
}
```

###### **Example**

```
arcgis.group(id)
.then(function (group) {
  return group.leave()
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### group.changeOwner

> If you are an org admin, you can always perform this if you are a member of the group. Otherwise, only admins can do this maybe?

Changes to owner to a specified username.

**Params:**
String of a Username

**Returns:**
Promise that resolves to a confirmation JSON Object.

```
{
  success: true,
  groupId: id
}
```


###### **Example**
```
arcgis.group(id)
.then(function (group) {
  return group.changeOwner(username)
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### group.delete

Deletes the group. This does not delete content or users, just the group that aggregates them. This is permanent.

**Returns**
Promise that resolves to a JSON confirmation Object

```
{
  success: Boolean,
  groupId: String
}
```


###### **Example**
```
arcgis.group(id)
.then(function (group) {
  return group.delete()
})
.then(function (confirmation) {
  console.log(confirmation)
})
```

### group.create

> Creating a new group is a little different than the other group methods - one does not pass in a group Id, so it can be called off `group` immediately.

**Params:**
JSON Options object

| Options          | Default   | Description             |
| ---------------- | --------- | ----------------------- |
| title            | none      | String, Name of the group
| description      | none      | String, Description of the group
| summary          | none      | String, > 256 character summary
| tags             | none      | Array, tags for group
| access           | 'private' | String. 'private', 'public', or 'org'
| isViewOnly       | false     | Boolean. Can items be added to the group?
| isInvitationOnly | false     | Boolean. Can users join the group without an invitation?


###### **Example:**

```
var options = {
  title: 'My New Group',
  description: 'This group is both new and mine',
  tags: ['my', 'new', 'cool', 'group'],
  access: 'public'
}
arcgis.group.create(options)
.then(function (newGroup) {
  console.log(newGroup)
})
```

---

## item

> Item is a generic function that determines the type of item, and adds the appropriate methods from the functions below. If you know your item type, you can call the appropriate function below directly.

`Item` creates an object that has the details and interactive methods of an item in the platform. All items share a set of common methods, documented below. Specific item types have additional methods, as documented in [`layer`](#layer), [`map`](#map), [`application`](#application), and [`file`](#file).

**Params:**
String of an Item ID.

**Returns:**
Promise that resolves JSON Object with item information and methods.

```
{
  access: String,
  accessInformation: String,
  appCategories: Array,
  avgRating: Number,
  banner: String,
  commentsEnabled: Boolean.
  created: Date.
  culture: String,
  description: String,
  documentation: String,
  extent: Array,
  favorite: Boolean
  groups: Array
  id: String,
  itemControl: String
  largeThumbnail: String,
  licenseInfo: String
  listed: Boolean,
  modified: Date,
  name: String,
  numComments: Number,
  numRatings: Number,
  numViews: Number,
  owner: String,
  ownerFolder: String,
  properties: String?,
  protected: Boolean,
  screenshots: Array,
  size: Number,
  snippet: String,
  spatialReference: String,
  tags: Array,
  thumbnail: String,
  title: String,
  type: String,
  typeKeywords: Array,
  url: String,
  update: Function,          // Updates information
  rate: Function,            // Sets a rating
  favorite: Function,        // Adds to favorites
  duplicate: Function,       // Creates a copy, with options
  folder: Function,          // Moves to a folder
  changeOwner: Function,     // Changes owner
  deleteProtected: Function, // Prevents deletion
  relatedItems: Function,    // Gets related items
  permissions: Function,     // Sets permissions
  delete: Function,          // Deletes item
  // Additional methods per type, documented below
}
```


###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  console.log(item)
})
```

### item.data

Get the data content of the item such as WebMap or App configuration.

**Params:**
String of an Item ID.

**Returns:**
Promise that resolves JSON Object with item data.

###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  return item.data()
})
.then(function (data) {
  console.log(data)
})
```

### item.create

> Creates a new Item and optional data

**Params:**
JSON Options object

| Options          | Default   | Description             |
| ---------------- | --------- | ----------------------- |
| title            | none      | String. Name of the group
| description      | none      | String. Description of the group
| snippet          | none      | String. > 256 character summary
| tags             | none      | Array. tags for group
| url              | none      | String. Web URI
| data             | none      | String. Data content such as WebMap JSON or App configuration
| licenseInfo      | none      | String. access and usage permissions or constraints
| thumbnail        | none      | String. URL to a thumbnail
| extent           | none      | String. minimum bounding extent
| type             | none      | String. Type of item from all Portal types


###### **Example:**

```
var options = {
  title: 'My New Item',
  description: 'This item is both new and mine',
  tags: ['my', 'new', 'cool', 'item'],
  type: 'Web Mapping Application',
  owner: 'myuser'
}
arcgis.item.create(options)
.then(function (newItem) {
  console.log({'id': newItem.id, 'title': newItem.title})
})
```

### item.update

Updates the information for an item.

**Pa­ra­me­ters:**
JSON Object of Options

| Options        | Type      | Description             |
| -------------- | --------- | ----------------------- |
| title          | String    | Human readable title |
| snippet        | String    | <= 256 character summary |
| description    | String    | Longer description |
| tags           | Array     | Array of tags |
| extent         | Array     | [[lat, long], [lat, long]] |
| licenseInfo    | String    | Something? |
| accessInformation | String | Something? |

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  return item.update({title: 'A New Hope'})
})
.then(function (item) {
  console.log(item)
})
```

### item.permissions

> In this case, 'private' means that the only the user **and admins in that users org** can view the item.

Updates the permissions for the item, either user only, organization, or public, and what groups have access to the item.

**Params:**
Options object

| Options        | Type      | Description             |
| -------------- | --------- | ----------------------- |
| access          | String   | 'private', 'org', 'public' |
| group        | Array    | Group id's to allow access |


**Re­turns:**
Promise that resolves to the updated [`item`](#item)

**Example**
```
arcgis.item(itemId)
.then(function (item) {
  options = {
    access: 'private',
    groups: [
      group1id,
    group2id
    ]
  }
  return item.permissions(options)
})
.then(function (item) {
  console.log(item)
}
```


### item.rate

> A user cannot rate their own item.

Items can be rated by users. These ratings are tracked, and an average rating is stored with the item. Users can change their rating of an item at any time. Associates a rating with the currently authenticated user.

**Params:**
Number, between 0 and 5

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  return item.rate(5)
})
.then(function (item) {
  console.log(item)
})
```

### item.isFavorite

> Checking if an item is currently in the your favorites group takes a couple of extra calls, so we don't return that with the item itself.

Checks to see if an item is in the users 'favorite items' group.

**Re­turns:**
Promise that resolves to a boolean

###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  return item.isFavorite()
})
.then(function (isFavorite) {
  console.log(isFavorite)
})
```

### item.favorite

> A users `favorites` are a [group](#group) that only that user is a member of. Presumably other users can be added to this. In most interfaces, this group is excluded from the list of other groups.

This method adds and removes an item from the users 'favorite items' group.

**Params:**
Boolean

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  return item.favorite(true)
})
.then(function (item) {
  console.log(item)
})
```

### item.groups

> An item being in a group is often referred to as being 'shared with' that group.

Items can be placed in one or more groups. This call determines what groups that item is a part of. This only returns groups that you can see - meaning it won't return other users 'favorite items' groups.

**Returns:**
Promise that resolves to an array of [group](#group) objects.

###### **Example:**
```
arcgis.item(itemId)
.then(function (item) {
  return item.groups()
})
.then(function (groups) {
  console.log(groups)
})
```

### item.changeOwner

> If the permissions on the item are set to private, this action could remove the item from your view entirely. This cannot be undone unless your user has admin permissions.

Reassigns the item to a new user. This will remove the item from the content of the original user, and add it to the content of the new user.

**Params:**
String of a username

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  return item.changeOwner(username)
})
.then(function (item) {
  // Will return an error if you no longer have permissions to view the item.
  console.log(item)
}
```

### item.deleteProtected

Sets a boolean on the item that allows the item to be deleted.If set to `true`, this needs to be changed to `false` before [`item.delete`](#itemdelete) will function.

**Params:**
Boolean

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item(itemId)
.then(function (item) {
  return item.deleteProtected(true)
})
.then(function (item) {
  console.log(item)
}
```

### item.delete

> For real, once you do this, you can't undo it.

Deletes the item. Permanently. For ever. Seriously. Keep this from being to terrifying on production items with [`item.deleteProtected`](#itemdeleteprotected).

**Re­turns:**
Promise that resolves to an object with a confirmation.

###### **Example**
```
arcgis.item(itemId)
.then(function (item) {
  return item.delete()
})
.then(function (confirmation) {
  console.log(confirmation)
}
```

---

## layer

> For example, if you know your item id is for a layer, you can call `arcgis.layer(itemid)`. If aren't sure, than `arcgis.item(itemid)` will check, and return the appropriate type.

`Layer` returns an [`item`](#item) with additional methods.

**Params:**
String of an Item ID.

**Returns:**
Promise that resolves JSON Object with item information and methods.

```
{
  data: Function,          // Geographic data in the layer
  export: Function,        // Exports to defined format
  generateTiles: Function, // Creates a tile layer
  usage: Function          // Reports credits, requests
}
```

###### **Example**

```
arcgis.layer('layerId')
.then(function (layer) {
  console.log(layer)
})
```

### layer.data

Layers have geographic data - a set of features with properties. This method returns that geographic data as ... something?

**Returns:**
Promise that resolves to a JSON Object

```
{
  features: [
    {
      attributes: Object,
      geometry: Object
    }
  ],
  fields: [
    {
      ???: ???
    }
  ],
  geometryType: String,
  globalIdFieldName: String,
  objectIdFieldName: String,
  spatialReference: {
  latestWkid: String,
  wkid: String
  }
}
```

###### **Example:**

```
arcgis.layer(itemId)
.then(function (layer) {
  return layer.data()
})
.then(function (data) {
  console.log(data)
}
```

---

## map

> These map functions are largely aspirational.

`Map` returns an [`item`](#item) with additional methods.

```
{
  layers: Function,       // Lists the layers
}
```

### map.layers

Returns all the layers on the map, in order from back to front. Can also be used to reorder layers on the map.

**Returns**
Promise that resolves to an Object

```
{
  authoringApp: String,
  authoringAppVersion: String,
  baseMap: {
    baseMapLayers: [
      {
        id: String,
        layerType: String,
        opacity: Number,
        url: String,
        visibility: Boolean,
        length: Number,
        title: String
      }
    ]
  },
  operationalLayers: [
    {
      id: String,
      itemId: String,
      layerType: String,
      opacity: Number,
      popupInfo: Object,
      title: String,
      url: String,
      visibility: Boolean
    }
  ],
  spatialReference: {
    latestWkid: String,
    wkid: String
  }
}
```

###### **Example:**

```
arcgis.map(itemId)
.then(function (map) {
  return map.layers()
})
.then(function (layers) {
  console.log(layers)
})
```

---

## application

`Application` returns an [`item`](#item) with additional methods.

```
{
  register: Function,     // Registers app with the portal
  getOAuth: Function,     // Gets oAtuh data for app
  getToken: Function      // Creates a token for the app
}
```

### application.register

Registers the application with the platform, providing access to oAuth methods.

**Returns:**
Promise that resolves to the updated [`application`](#application)

###### **Example**

```
arcgis.application(appid)
.then(function (application) {
  return application.register()
})
.then(function (application) {
  console.log(application)
})
```

### application.getOAuth

Gets the applications oAuth information, including client id and secret.

**Returns:**
Promise that resolves to the oAuth information object.

###### **Example**

```
arcgis.application(appid)
.then(function (application) {
  return application.getOAuth()
})
.then(function (oAuth) {
  console.log(oAuth)
})
```

### application.getToken

Gets a valid token from the app. This token can used to access services.

**Returns:**
Promise that resolves to the token

###### **Example**

```
arcgis.application(appid)
.then(function (application) {
  return application.getToken()
})
.then(function (token) {
  console.log(token)
})
```

---

## file

`File` returns an [`item`](#item) with additional methods.

```
{
  publish: Function, // Turns the file into a layer
  download: Function // Downloads the file
}
```

### file.publish

If the file contains geographic data - csv, geojson, shapefile, geodatabase, etc - it can be turned into a layer that you can use on maps. Results in a confirmation object that contains information on the new layer.

Returns a Job ID in the confirmation, which can be used to pole the service to see if the layer has finished being created.

**Returns**
Promise that resolves to an object with array of processes

> The `serviceItemId` key is the item ID for the newly created layer.

```
{
  services: [
    {
      encodedServiceURL: String,
      jobId: String,
      serviceItemId: String,
      serviceurl: String,
      size: Number,
      type: String
  }
}
```

### file.download

Downloads the file.

---
