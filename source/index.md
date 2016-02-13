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
          - Content
          - Update
          - Users
          - RemoveUsers
          - AddUsers
          - Join
          - Leave
          - ChangeOwner
          - Delete
      - title: Usage
        methods:
  - title: "Items"
    sections:
      - title: Item
        methods:
          - Update
          - Rate
          - Favorite
          - Duplicate
          - Folder
          - ChangeOwner
          - DeleteProtected
          - Permissions
          - Delete
      - title: Layer
        methods:
          - Data
          - Export
          - generateTiles
          - Usage
      - title: Map
        methods:
          - Data
          - Export
          - layers
          - addLayers
          - removeLayers
          - Usage
      - title: Application
        methods:
          - Register
          - GetOAuth
          - GetToken
          - Usage
      - title: File
        methods:
          - Update
          - Publish
          - Download
          - relatedItems
---


***

# `ArcGIS`

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
  usage: Function         // Report usage
}
```

######
###### **Example**

> You can probably set up multiple of these suckers in one session to have access to public and private stuff at the same time.

```
var ArcGIS = require('arcgis')
<!-- Create an anonymous session with www.arcgis.com -->
var anonAGO = ArcGIS()
<!-- Create an authenticated session with www.arcgis.com -->
var authAGO = ArcGIS({
	token: token
})
<!-- Creat an anonymous session with ArcGIS Server -->
var serverGIS = ArcGIS({
	domain: 'myGIS.myurl.com'
})
```

---

## `request`

> Request has a lot of functionality that I've been told we need, but I'm really not sure that any of it is. Right now, this barebones request works fine. As it stops working fine, we'll add more to it.

Request uses information in the client to make calls to the API. It takes a url substring, a JSON object, and a boolean.

Request appends the URL to the clients domain and the omnipresent 'sharing/rest'. The JSON object gets processed into parameters. The boolean defines the request is GET (default, false) or POST (true). Request also appends the token that the current client session is authenticated with, and defines the response format as JSON.

Some services - like usage, analysis, things like that – require a different root URL, since they are an independent API. Passing a root URL in as the fourth param will replace the standard Root.

**Parameters:**

| Parameter | Type | Default |
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
    <!-- This calls the endpoint self, and returns a version number of the API. -->
	console.log(results)
})
```

---

## `search`

> this is growing in support as needed

Searches for SQL queries against the api.

**Params:**
Query String, Results per Page, Page, Sort By, Sort Order

| Param | Default | Description |
| --- | --- | --- |
| queryString | '\"\"'' | String, what to search for. Can be [complicated.](http://doc.arcgis.com/en/arcgis-online/reference/search.htm) |
| num | 100 | Results per page |
| page | 0 | Page of results to return |
| sort | 'created' | Field to sort results on |
| order | 'desc' | 'asc' or 'desc', ascending or descending |

**Results:**
Promise that resolves to a Paginated search results Object

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
arcgis.search('owner:NikolasWise AND (type:"Feature Service")', 100)
.then(function(results) {
  console.log(results)
})

```

---

## `user`

> Every method off `ArcGIS()` returns a promise, and involve making requests to the domain.

This object us used to interact with a user - your own user account, other users in your organization, or publicly available users that are not associated with your organization. This method is also used to create new users by inviting them to your organization.

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
  privileges: Array, 		 // Strings that denote actions
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

### `user.update`

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

### `user.content`

> This is _not_ using the user content method from the ArcGIS API. Instead, this is using a the [`search`](#search) method and pre-filling the parameters to locate the current user's content. This is done to have all content calls share response properties. The raw user content api call is the only call in the platform that does not return a paginated results object.

Returns an array of all of the users items and folders. If passed a folder id, will return an array of the items in that folder. These items have the same static properties as the results of [`item`](#item), but do not have methods attached to them.

**Params:**
Flolder ID, Results per Page, Page, Sort By, Sort Order

| Params         | Default      | Description             |
| -------------- | ------------ | ----------------------- |
| folder         | /       | Folder of content to return  |
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

### `user.favorites`

Users store their their favorite items in a group associated with their account. Getting a users favorites is similar to getting any other groups content.

**Params:**
Results per Page, Page, Sort By, Sort Order

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

### `user.enabled`

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

### `user.delete`

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


---

## `organization`

> Organizations are the central entities in the ArcGIS platform. All users belong to an Organization.

This object us used to interact with an Organization within the domains Portal - ArcGIS Online for example has many organizations that can be interacted with. An on-premises version of Portal or Server may have fewer, if not just one.

Calling the function without any parameters will create an object that interacts with the organization that is currently authenticated. Calling the function with an organizations ID will interact with that organization from the perspective of a public user.

**Params:**
String of an Org Id.

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Org Id         | String       | self                    |

**Returns:**
JSON Object. (Not a promise!)

```
{
  get: function(),           // gets user information
  update: function(options), // updates the user information
  delete: function(),        // deletes a user
  content: function(),       // gets users content
  tags: function(),          // returns the users tags?
  enable: function(),        // enables a disabled user
  disable: function(),       // disables a user
}
```


###### **Example**

```
var myOrg = arcgis.organization()
<!-- Creates an object with methods for interacting with the org associated with the current authorized session -->

var otherOrg = arcgis.organization('orgId')
<!-- Creates an object with methods for interacting with a given org -->
```

### `organization.get`

All the in­for­ma­tion as­so­ci­ated with an organization that the current session has access too.

> This is only a small sample of the returned properties. The actual returned object is very large, and I'm not sure what most of it is for.

**Returns:**
Promise that resolves to JSON Object

```
{
  access: String,
  availableCredits: Number,
  backgroundImage: String,
  created: Date,
  culture: String,
  defaultBasemap: Object,
  defaultExtent: Object,
  description: String,
  featuredGroups: Array,
  featuredGroupsId: String,
  helpBase: String,
  homePageFeaturedContent: String,
  homePageFeaturedContentCount: Number,
  id: String,
  ipCntryCode: String,
  modified: Date,
  name: String,
  region: String,
  staticImagesUrl: String,
  subscriptionInfo: Object,
  supportsHostedServices: Boolean,
  supportsOAuth: Boolean,
  thumbnail: String,
  units: String,
  urlKey: String,
  user: Object
}
```

### `organization.update`

Takes an op­tions ob­ject, and sets the organizations in­for­ma­tion to the op­tions pro­vided. Re­turns an er­ror, or the up­dated organization ob­ject.

**Params:**
JSON Object

```
{
  name: String,              // The character limit is 250.
  access: String,            // Setting to public allows anonymous users to access your organization's custom URL. Setting to private restricts access to only members of your organization.
  description: String,
  canSharePublic: Boolean,   // Allows members of the organization to share outside the organizatio
  canSearchPublic: Boolean,  // Allows members of the organization to search outside the organization.
  thumbnail: String,         // Acceptable image formats are PNG, GIF, and JPEG.
  urlKey: String,            // The prefix that will be used in the URL for this portal, for example, <urlkey>.maps.arcgis.com.
  urlHostname: String,       // A custom URL for this portal.
  culture: String            // The default locale (language and country) information.
}
```

### `organization.members`

Gets the members within an organization. Takes a number, and returns as a paginated list with that number of members per page. Returns 100 members per page by default.

**Params:**
Number

> If the `nextStart` value is -1, that means your on the last page of the results. The objects returned in the `users` array are the same as in [`user.get()`](#userget)

**Returns:**
Promise that resolves to JSON Object

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
var myOrg = arcgis.organization()
myOrg.users(10)
.then(function(results) {
	console.log(results)
})
```

### `organization.content`

Gets the items in an or­ga­ni­za­tion. Takes a num­ber, and re­turns as a pag­i­nated list with that number of items per page. Re­turns 100 items per page by de­fault, starting at the first page of results.

> This is a shortcut helper for the `search` method with the query needed to target an org predefined.

**Params:**
Results Per Page, Page

**Returns:**
Promise that resolves to JSON Object

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
var myOrg = arcgis.organization()
myOrg.content()
.then(function(results) {
	console.log(results)
})
```

### `organization.featured`

Organizations can add items to a group that is for specially 'featured content', items that may be common or high-traffic within the organization. This group is displayed on the orgs home page.

Takes a number, and returns a paginated list of items within the organizations featured group.

> This method is the same as [`group.content()`](#groupcontent), but with the group id prefilled from the organizations profile.

**Params:**
Number

**Returns:**
Promise that resolves to a JSON Object
```
{
  nextStart: Number,
  num: Number,
  query: String
  results: Array,
  start: Number,
  total: Number
}
```


###### **Example**

```
var myOrg = arcgis.organization()
myOrg.featured()
.then(function(results) {
	console.log(results)
})
```

---

## `group`

> In the ArcGIS platform, groups are used to aggregate users and content together. They can contain items and users from outside organizations, be authorized to access applictions and content purchased from [the marketplace](https://marketplace.arcgis.com/), and are used to manage things like user favorites and featured content.

This object us used to interact with a group. Any group that your user has permissions to access can be interacted with via this method. As with the [`user`](#user) object, calling this method with no parameters allows you to create a new group.

**Params:**
A group id string

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| GroupID        | String       | none                    |

**Returns:**
JSON user object with management methods.

```
{
  get: function (),         // Gets the group information
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
var group = arcgis.group('groupID')
```

### `group.create`

Creating a group is not too much trouble.

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Options        | Object       | see below               |

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| title            | String  | The group title must be unique for the username, and the character limit is 250. |
| description      | String  | A description of the group that can be any length. |
| snippet          | String  |  Snippet or summary of the group that has a character limit of 250 characters. |
| tags             | Array   | Tags are words or short phrases that describe the group. |
| phone            | String  | Phone is the group contact information. It can be a combination of letters and numbers. The character limit is 250. |
| access           | String  | Sets the access level for the group. private is the default. Setting to org restricts group access to members of your organization. If public, all users can access the group. // 'org' / 'public' / 'private' |
| sortField        | String  |  Sets sort field for group items.  // 'title' / 'owner' / 'avgrating' / 'numviews' / 'created' / 'modified'
| sortOrder        | String  |  Sets sort order for group items. // 'asc' / 'desc' |
| isViewOnly       | Boolean | Allows the group owner or admin to create view-only groups where members are not able to share items. |
| isInvitationOnly | Boolean | If true, this group will not accept join requests. If false, this group does not require an invitation to join. |
| thumbnail        | String  | Path to the thumbnail image to be used for the group. |


**Returns**
Newly created group object, as per [`group.get`](#groupget)


###### **Example**

```
var options = {
  title: 'My pretty cool group',
  description: 'Its not a huge deal, but this group is pretty cool',
  snippet: 'For cool people, for cool content.',
  tags: ['cool', 'rad'],
  access: 'Public',
  isViewOnly: false,
  isInvitationOnly: true
}
arcgis.group().create(options)
.then(function (group) {
	console.log(group)
})
```

### `group.get`

All the in­for­ma­tion as­so­ci­ated with a group that the cur­rent ses­sion has ac­cess too.

**Returns:**
Promise that resolves to JSON Object


###### **Example**

```
{
  access: String
  capabilities: Array
  created: Date
  description: String
  id: String
  isFav: Boolean
  isInvitationOnly: true
  isReadOnly: Boolean
  isViewOnly: Boolean
  modified: Date
  owner: String
  phone: String
  provider: String
  providerGroupName: String
  snippet: String
  sortField: String
  sortOrder: String
  tags: Array
  thumbnail: String
  title: String
  userMembership: {
  	applications: Number
  	memberType: String
  	username: String
   }
}
```

### `group.update`

Updates the information for a group.

**Parameters:**
JSON Object identical to [`group.create`](#groupcreate)

**Returns:**
Promise that resolves to updated group information object


###### **Example**
```
arcgis.group('groupId')
group.update({
  title: "My New Group Name"
})
```

### `group.delete`

Deletes the group. This does not delete content or users, just the group that aggregates them. This is permanent.

**Returns**
Promise that resolves to a JSON Object

```
{
  success: Boolean,
  groupId: String
}
```


###### **Example**
```
arcgis.group('groupId')
group.delete()
```

### `group.content`

> This item results object is similar to a [search](#search) results object.

Gets the group in a content as a paginated object. Takes a num­ber, and re­turns as a pag­i­nated list with that number of items per page. Re­turns 100 items per page by de­fault.
Number

**Params:**
Results Per Page, Page

**Returns:**
Promise that resolves to JSON Object

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
arcgis.group('groupId')
group.content()
.then(function (results) {
  console.log(results)
})
```

### `group.members`

> This item is not paginated, not similar to a search results object. Comme se, comme ca I guess.

Gets the users within a group, along with the groups owner and an array of group admins.

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
arcgis.group('groupId')
group.members()
.then(function (results) {
  console.log(results)
})
```

### `group.removeUser`

Removes one or more users from the group.

**Params:**
Array of username strings

**Returns:**
Promise that resolves to a JSON Object
```
{
  somestuff: 'I guess?'
}
```


###### **Example**
```
var group = arcgis.group('groupId')
group.removeUsers(['userOne', 'userTwo'])
.then(function (results) {
  console.log(results)
})
```

### `group.join`

Creates a request to join a group for the currently authenticated user.

**Returns**
Promise that resolves to a JSON Object
```
{
  not: sure
}
```

### `group.leave`

Removes the currently authenticated user from the group.

**Returns**
Promise that resolves to a JSON Object
```
{
  something: maybe
}
```

### `group.changeOwner`

> Unknown limits on this.

Changes to owner to a specified username.

**Params:**
String of a Username

**Returns:**
Promise that resolves to a JSON Object. If access to the group is still available, returns the updated group. If not, some message to confirm the action

```
{
 it: worked
}
```


###### **Example**
```
var group = arcgis.group('groupid')
group.changeOwner('newOwnerUsername')
.then(function (results) {
  console.log(results)
})
```

---

## `usage`

```
var orgUsage = arcgis.usage()
var itemUsage = arcgis.usage(itemId)
orgUsage.get()  // returns Promise
itemusage.get() // returns Promise

<!-- or -->

var orgUsage = arcgis.org(orgId).usage(options)    // returns Promise
var itemUsage = arcgis.item(itemId).usage(options) // returns Promise
```

```
var usage = arcgis.usage()
usage.items(options)
usage.users(options)
usage.org(options)

var org = arcgis.org(orgId)
org.usage(options)

var item = arcgis.item(itemId)
item.usage(options)

var user = arcgis.user(username)
user.usage(options)
```


### `usage.get`

---

## `item`

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
  usage: Function,           // Gets usage report
  delete: Function,          // Deletes item
  // Additional methods per type, documented below
}
```


###### **Example**

```
arcgis.item('itemId')
.then(function (item) {
  console.log(item)
})
```

### `item.update`

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
arcgis.item('itemId')
.then(function (item) {
  var options = {title: 'A New Hope'}
  return item.update(options)
})
.then(function (item) {
  console.log(item)
}
```

### `item.rate`

> A user cannot rate their own item.

Items can be rated by users. These ratings are tracked, and an average rating is stored with the item. Users can change their rating of an item at any time. Associates a rating with the currently authenticated user.

**Params:**
Number, between 0 and 5

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item('itemId')
.then(function (item) {
  return item.rate(5)
})
.then(function (item) {
  console.log(item)
}
```

### `item.favorite`

> A users `favorites` are a [group](#group) that only that user is a member of. Presumably other users can be added to this. In most interfaces, this group is excluded from the list of other groups.

When an Item is fetched, it will have a key that is a boolean of whether that item is in that users favorite group or not. This method adds and removes an item from that group.

**Params:**
Boolean

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item('itemId')
.then(function (item) {
  return item.favorite(true)
})
.then(function (item) {
  console.log(item)
}
```

### `item.duplicate`

> Totally not sure what this works on. I think everything can be duplicated tho?

Duplicates an item. The new item has a new name, description, snippet, tags, and permissions model.

**Params:**
JSON Object of new item properties

| Options        | Type      | Default                 |
| -------------- | --------- | ----------------------- |
| title          | String    | As original |
| snippet        | String    | As original |
| description    | String    | As original |
| tags           | Array     | As original |
| extent         | Array     | As original |
| licenseInfo    | String    | As original |
| accessInformation | String | As original |
| permissions    | String    | As original |
| groups         | Array   | Array of group ids from source |

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item('itemId')
.then(function (item) {
  var options = {
	title: 'A New New Hope',
	snippet: 'Just like the old one, but newer'
  }
  return item.duplicate(options)
})
.then(function (newItem) {
  console.log(newItem)
}
```

### `item.folder`

> Folders have names and ID's. This means folders can have non-unique names. Watch out!

Adds the item to a folder by folder ID. Passing the the value `'/'` adds the item to the root folder.

**Params:**
String of the folder ID.

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item('itemId')
.then(function (item) {
  return item.folder('/')
})
.then(function (item) {
  console.log(item)
}
```

### `item.changeOwner`

> If the permissions on the item are set to private, this action could remove the item from your view entirely. This cannot be undone unless your user has admin permissions.

Reassigns the item to a new user. This will remove the item from the content of the original user, and add it to the content of the new user.

**Params:**
String of a username

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item('itemId')
.then(function (item) {
  return item.changeOwner(username)
})
.then(function (item) {
  // Will return an error if you no longer have permissions to view the item.
  console.log(item)
}
```

### `item.deleteProtected`

Sets a boolean on the item that allows the item to be deleted.If set to `true`, this needs to be changed to `false` before [`item.delete`](#itemdelete) will function.

**Params:**
Boolean

**Re­turns:**
Promise that resolves to the updated [`item`](#item)

###### **Example**

```
arcgis.item('itemId')
.then(function (item) {
  return item.deleteProtected(true)
})
.then(function (item) {
  console.log(item)
}
```

### `item.permissions`

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
arcgis.item('itemId')
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

### `item.delete`

> For real, once you do this, you can't undo it.

Deletes the item. Permanently. For ever. Seriously. Keep this from being to terrifying on production items with [`item.deleteProtected`](#itemdeleteprotected).

**Re­turns:**
Promise that resolves to an object with a confirmation.

###### **Example**
```
arcgis.item('itemId')
.then(function (item) {
  return item.delete()
})
.then(function (confirmation) {
  console.log(confirmation)
}
```

---

## `layer`

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

### `layer.data`

Layers have geographic data - a set of features with properties. This method returns that geographic data as ... something? Geojson would be nice.

### `layer.export`

Exports data layers in a defined format. Can be generic `.csv`, `.geojson`, or more proprietary esri formats `.shx`, `.gbd`.

### `layer.generateTiles`

> Most layers contain vector feature data - generating tiles is a way to get large vector data sets into raster.

Creates a new tile layer from the existing layer. These tiles are drawn with the default renderer associated with the layer.

### `layer.usage`

Reports usage information for the layer, including credit cost for hosting the layer, bandwidth consumed by the layer, and requests made to the layer over a time period.

---

## `map`

> These map functions are largely aspirational.

`Map` returns an [`item`](#item) with additional methods.

```
{
	data: Function,         // Gets all map data
	export: Function,       // Exports map
	layers: Function,       // Lists the layers
	addLayers: Function,    // Adds a layer
	removeLayers: Function  // Removes a layer
	generateTiles: Function, // Creates a tile layer
	usage: Function          // Reports credits, requests
}
```

### `map.data`

maps have geographic data - a set of features with properties. This method returns that geographic data as ... something? Geojson would be nice.

### `map.export`

Exports data maps in a defined format. Can be generic `.csv`, `.geojson`, or more proprietary esri formats `.shx`, `.gbd`.

### `map.layers`

Returns all the layers on the map, in order from back to front. Can also be used to reorder layers on the map.

### `map.addLayers`

Adds one or more layers to the map by layer id.

### `map.removeLayers`

Removes one or more layers from the map, by layer id.

### `map.generateTiles`

Creates a new tile map from the existing map. These tiles are drawn with the default renderer associated with the map.

### `map.usage`

Reports usage information for the map, including credit cost for hosting the map, bandwidth consumed by the map, and requests made to the map over a time period.

---

## `application`

`Application` returns an [`item`](#item) with additional methods.

```
{
	register: Function,     // Registers app with the portal
	getOAuth: Function,     // Gets oAtuh data for app
	getToken: Function      // Creates a token for the app
}
```

### `application.register`

Registers the application with the platform, providing access to oAuth methods.

###### **Example**

**Returns:**
Promise that resolves to the updated [`application`](#application)

```
arcgis.application(appid)
.then(function (application) {
  return application.register()
})
.then(function (application) {
  console.log(application)
})
```

### `application.getOAuth`

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

### `application.getToken`

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

## `file`

`File` returns an [`item`](#item) with additional methods.

```
{
	update: Function,  // Replaces the file with a new file
	publish: Function, // Turns the file into a layer
	download: Function // Downloads the file
}
```

### `file.update`

Files are static items that are kept in the Portal after they've been uploaded. You can replace a file with a new file, provided they have the same name.

### `file.publish`

If the file contains geographic data - csv, geojson, shapefile, geodatabase, etc - it can be turned into a layer that you can use on maps.

### `file.download`

Downloads the file.

---

