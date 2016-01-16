---
reference:
  - title: "Library Methods"
    sections:
       - title: ArcGIS
       - title: Request
  - title: "Platform Management"
    sections:
      - title: User
        methods:
          - Create
          - Get
          - Update
          - Content
          - Favorites
          - Tags
          - Enabled
          - Delete
      - title: Organization
        methods:
          - Get
          - Update
          - Members
          - Content
          - Featured
      - title: Group
        methods:
          - Create
          - Get
          - Content
          - Update
          - Users
          - RemoveUsers
          - AddUsers
          - Join
          - Leave
          - ChangeOwner
          - Delete
      - title: Item
        methods:
          - New
          - Get
          - Update
          - Rate
          - Favorite
          - Duplicate
          - Folder
          - ChangeOwner
          - Publish
          - Export
          - Download
          - DeleteProtected
          - Register
          - GetOAuth
          - GetToken
          - RelatedItems
          - Permissions
          - Delete
      - title: Search
      - title: Billing

  - title: "Services"
    sections:
      - title: Geocode
      - title: Route
      - title: Geoenrichment
  - title: "Analysis"
    sections:
      - title: Elevation
      - title: Spatial Analysis
---


***

# `ArcGIS`

> There are a number of ways to authenticate with the platform - either passing in a token when the function is called, or a username and password. As the project grows, we will add more auth methods.

Initialize the client library session to access the API either as an anonymous user, or as an authenticated member of an organization. Calling `ArcGIS()` with no parameters will set up an instance of the platform that talks to ArcGIS Online as a public, anonymous user.

**Params:** JSON Object with the following options;

| Options        | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| token          | String       | none                    |
| domain         | URL          | www.arcgis.com/         |
| username		 | String       | none   				  |
| password       | String		| none. Careful with this |
| withCreditential | Boolean    | false. For federated accounts. |


**Returns:** JSON Object with ArcGIS methods.

```
{
  auth: function(),         // Authenticates the session
  request: function(),      // Makes requests to the domain
  user: function(),         // Sets up methods for a user
  organization: function(), // Sets up methods for an org
  group: function(),        // Sets up methods for a group
  item: function(),         // Sets up methods for an item
  usage: function(),        // Sets up methods for usage
  billing: function(),      // Sets up methods for billing
  search: function()        // Searches the platform
}
```

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

**Parameters:**

| Parameter | Type | Default |
| -- | -- | -- |
| url | String | / |
| form | Object | {} |
| post | Boolean | false |

**Response:**
Promise that resolves to whatever the endpoint returns.

**Example**
```
arcgis.request()
.then( function (results) {
    <!-- This calls the endpoint self, and returns a version number of the API. -->
	console.log(results)
})
```

---

## `user`

> Almost all the methods off `ArcGIS()` return an object immediately, which sets up the methods for interacting with the platform. These methods almost always return promises, and involve making requests to the domain.

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
  get: function(),           // gets user information
  update: function(options), // updates the user information
  delete: function(),        // deletes a user
  content: function(),       // gets users content
  tags: function(),          // returns the users tags?
  enable: function(),        // enables a disabled user
  disable: function(),       // disables a user
}
```

**Example**

```
var user = arcgis.user('username')
```


### `user.create`

> Several function return different sets of methods depending on the params passed. `user()`, `group()`, and `item()` all return a single `create()` function if no params are passed.

Users must be invited to an organization, they cannot be added. To add a user, you must generate an invitation in the platform, which will send an e-mail with instructions for joining a group.

**Params:**
JSON Object

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| subject        | String       | Subject of invitation email |
| html           | String       | HTML string of message body |
| invitations    | Array | Invitations to create invitations from |

**Invitation:**
JSON Object

| Param | Type | Description |
| - | - | - |
| username  | The username for the new user
| password  | The password for the new user. If blank, the new user will set it themselves.
| firstname | The users first name
| lastname  | The users last name
| fullname  | The users full name
| email     | The email address to send the invitation, and link to the users account.
| role      | The role of the user. Editor / User.

**Returns:**
Promise that resolves to the newly created user invitation object.

**Example**

```
var options = {
	subject: "Welcome to the Team",
	html: "<h1>It's gonna be great!</h1>",
	invitations: {
		username: 'pat',
		email: 'pat@email.com'
	}
}

arcgis.user().create(options)
.then(function (invitation) {
	console.log(invitation)
})
```

### `user.get`

All the information associated with a user that the current session has access too.

**Params:**
None.

**Returns:**
Promise that resolves to JSON Object

```
// always returned on any user
  "created": Date            // when this user was created
  "firstName": String        // recorded first name of the user
  "fullName": String         // recorded name of the user
  "lastName": String         // recorded last name of the user
  "provider": String         // ???
  "username": String         // hard username for the user. Never changes.

// the following are not returned if the user is private
  "email": String            // email address of user
  "culture": String          // two letter lang code ex: 'en'
  "description": String      // text description set by the user
  "privileges": Array 		 // Array of strings that denote actions
  "favGroupId": String       // ID of user favorites group
  "groups": Array            // Array of group objects associated with the user
  "orgId": String            // ID of the org the user belongs too
  "modified": Date           // date when the user
  "region": String           // two letter country code ex: 'us'
  "tags": Array              // array of tags that user has used maybe?
  "thumbnail": String        // name of the users thumbnail image ex: 'coolguy.jpg'
  "units": String            // 'imperial' or 'metric'
```

**Example**
```
user.get()
.then(function (profile){
  console.log(profile)
})
```

### `user.update`

Takes an options object, and sets the users information to the options provided. Returns an error, or the updated user object.

**Params:**
Options JSON Object

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| access         | 'public' / 'org' / 'private' | Visibillity of the user to searches. |
| preferredView  | 'Web' / 'GIS' / 'null' | Something about ... something? |
| description    | String | Plain text description of the user. |
| tags           | Array | Tags for the user used for ... something? |
| thumbnail      | Path | The file to be used as the users profile image. |
| password       | String | Set the users password to the new string. |
| fullname       | String | The full name of the user. |
| email          | Email Address | Email address to contact the user at. |
| securityQuestionIdx | Integer | Index of the security question in the Security Question Array. |
| securityAnswer | String | Plain string of the answer to the security question. |
| culture        | Culture Code | Culture code for the user. |
| region         | Country Code |  Region code for the user. |

**Returns:**
Promise that resolves to the updated user JSON Object.

**Example**

```
user.update({
	preferredView: 'GIS',
	description: 'I am a GIS analyst.'
})
```

### `user.delete`

> This is a Future Feature, all delete methods will come in one swoop I hope.

Deletes the user.

### `user.content`

> Note that this is the only instance where content is returned un-paginated. If a user has lots and lots of content, this call may take some time to resolve.

Returns an array of all of the users items and folders. If passed a folder id, will return an array of the items in that folder. Each item returns the same results as the `item.get()` call.

**Params:**
String.

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Folder ID      | String       | none                    |

**Returns:**
Promise that resolves to a JSON Object.

```
{
	currentFolder: null, // this is the root folder
	folders: Array,      // array of folders the user has created
	items: Array,        // array of items in the root folder
	num: Number,        // number of items returned
	total: Number,      // number of items owned by the user
	start: Number,      // item this page of results starts on
	nextStart: Number,  // -1 if one page, otherwise first item in next page
	username: String     // The users name.
}
```

**Example**
```
user.content()
.then(function (userContent){
  console.log(userContent)
})
```

### `user.favorites`

Users store their their favorite items in a group associated with their account. Getting a users favorites is similar to getting any other groups content.

**Returns:**
Paginated search results object.

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

**Example**
```
user.favorites()
.then(function (userFavorites){
  console.log(userFavorites)
})
```

### `user.tags`

Gets all the tags that a user has used, along with counts of how many times that tag has appeared.

**Params:**
None.

**Returns:**
Promise that resolves to a JSON Object

```
{
	tags: [
		{
			count: Number, // Number of times the tag appears
			tag: String    // String of the tag itself
		},
		{
			count: Number, // Number of times the tag appears
			tag: String    // String of the tag itself
		}
	]
}
```

**Example**

```
user.tags()
.then(function(userTags){
  console.log(userTags)
})
```

### `user.enabled`

Enables and disables the user within the organization. Passing no boolean to the method will return the current state of the user.

If a user is disabled, that means that their account is not active, but has not been deleted. A disabled user still counts towards yours organizations maximum number of users.

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| User Enabled   | Boolean      | none                    |

**Returns:**
Promise, if no params passed resolves to a string.

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

**Example**

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

**Example**

```
var myOrg = arcgis.organization()
myOrg.users(10)
.then(function(results) {
	console.log(results)
})
```

### `organization.content`

Gets the items in an or­ga­ni­za­tion. Takes a num­ber, and re­turns as a pag­i­nated list with that number of items per page. Re­turns 100 items per page by de­fault.

> This is a shortcut helper for the `search` method with the query needed to target an org predefined.

**Params:**
Number

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
}
```

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**
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

**Example**
```
arcgis.group('groupId')
group.delete()
```

### `group.content`

> This item results object is similar to a search results object.

Gets the group in a content as a paginated object. Takes a num­ber, and re­turns as a pag­i­nated list with that number of items per page. Re­turns 100 items per page by de­fault.
Number

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
}
```

**Example**
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

**Example**

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

**Example**
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

**Example**
```
var group = arcgis.group('groupid')
group.changeOwner('newOwnerUsername')
.then(function (results) {
  console.log(results)
})
```

---

## `item`

> Items are complicated, and there are a lot of methods on this. Not every method works for every type of item. There's some work to do here to make this more structured.

Creates an object with methods for interacting with items. Calling the `item` method with no parameters will create an object that can call [`item.create`](#itemcreate) to make new items.

**Params:**
String of an Item ID.

**Returns:**
JSON Object with item manipulation methods.

```
{
	get: function(),             // Gets the item
	new: function(),             // Creates a new item from the current item
	update: function(),          // Updates the item
	delete: function(),          // Deletes the item
	createService: function(),   // Publishes the item to a service
	folder: function(),          // Returns the items folder, or moves it to a folder
	groups: function(),          // Returns the items groups, or adds it to groups
	owner: function(),           // Returns the items owner, or changes the owner
	favorite: function(),        // Favorites or defavorites the item.
	rating: function(),          // Returns the items rating and rates the item.
	publish: function(),         // Publishes the item—what does that mean? Tiles? should be tiles: function()
	export: function(),          // Downloads the data for an item
	data: function(),            // Gets the data table for an item
	deleteProtected: function(), // Gets delete protection status, sets delete protection status
	register: function(),        // Registers an item with oAuth
	oAuth: function(),           // Returns oAuth information for the item
	relatedItems: function(),    // Gets related items
	permissions: function(),     // Gets and sets permissions for the item
	comments: {
		get: function(),         // Gets all the comments on the item
		add: function(),         // Adds a comment to the item
		comment: function(),     // Gets a specific comments methods
			get: function(),     // Gets the comment
			edit: function(),    // Edits the comment
			delete: function(),  // Deletes the comment
		enabled: function()      // Returns if comments are enables, enables and disables comments
	}
}
```

**Example**

```
var item = arcgis.item('itemId')
```

### `item.create`

> This is weird and complicated.

This ... takes an object full of useful information and makes something out of it!

**Params:**
JSON Options Object

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| ... | ... | ... |

**Returns:**
Promise that resolves to the newly created item

**Example***
```
var newItem = arcgis.item()
<!-- Create a new Layer -->
newItem.create({
  title:
  snippet:
  description:
  tags:
})
.then( function (results) {
  console.log(results)
})
<!-- Create a new Map -->
<!-- Create a new Application -->
<!-- Upload a file -->
```


### `item.get`

All the in­for­ma­tion as­so­ci­ated with an item. This includes title, item type, things of that nature.

**Returns:**
Promise that resolves to a JSON Object.
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
  url: String
}
```

**Example**
```
var item = arcgis.item('ItemID')
item.get()
.then(function (results) {
  console.log(results)
})
```

### `item.new`

> This is also complicated, with lots of options. Not sure how to approach this yet.

Creates a new item from the current item. This can mean duplicated an item, creating a reference item that contains a different visualization, things like that.

**Params:**
JSON Object

**Returns:**
Promise that resolves to a JSON Object of the new item.

**Example**
```
var item = arcgis.item('ItemID')
item.new({
  title: 'New Item'
})
.then(function (results) {
  console.log(results)
})
```

### `item.update`

Up­dates the in­for­ma­tion for an item.

**Pa­ra­me­ters:**
JSON Ob­ject with keys from [`item.get`](#itemget)

**Re­turns:**
Promise that re­solves to up­dated item in­for­ma­tion ob­ject

**Example**
```
var options = {
  title: 'New Item Title'
}
var item = arcgis.item('ItemID')
item.update(options)
.then(function (results) {
  console.log(results)
})
```

### `item.rate`

> A user cannot rate their own item.

Items can be rated by users. These ratings are tracked, and an average rating is stored with the item. Users can change their rating of an item at any time.

**Params:**
Number, between 0 and 5

**Returns:**
Promise that resolves to a JSON Object of the new item information.

**Example**
```
var item = arcgis.item('itemId')
item.rate(5)
.then(function (results){
  console.log(results)
})
```

### `item.favorite`

> A users favorite is a group that only that user is a member of. Presumably other users can be added to this? In most UIs, this group is exluded from the list of other groups.

When an Item is fetched, it will have a key that is a boolean of whether that item is in that users favorite group or not. This method adds and removes an item from that group.

**Params:**
Boolean

**Returns:**
Promise that resolves to a JSON Object of the new item info

**Example**
```
var item = arcgis.item('itemId')
item.favorite(true)
.then(function (results){
  console.log(results)
})
```

### `item.duplicate`

> Totally not sure what this works on.

Duplicates an item.

**Params:**
JSON Object of new item properties

```
{
  title: String,
  snippet: String,
  tags: Array,
  description: String
}
```

**Returns:**
Promise that resolves to a JSON Object of newly created item.

**Example**
```
var options = {
  title: 'New Item',
  snippet: 'Just like the old one, but newer'
}
var item = arcgis.item('itemId')
item.duplicate(options)
.then(function (results){
  console.log(results)
})
```

### `item.folder`

> Folders have names and ID's.

Adds the item to a folder by folder ID, returns the contents of the folder as a paginated JSON Object.

**Params:**
String of the folder ID

**Returns:**
Promise that resolves to a JSON Object

> This is like a search results object, with extra goodies for the folder information.

```
{
  currentFolder: {
    created: Date,
    id: String,
    title: String,
    username: String
  },
  items: Array,
  nextStart: Number,
  num: Number,
  start: Number,
  total: Number.
  username: String
}
```

**Example**
```
var item = arcgis.item('ItemId')
item.folder('folderId')
.then(function (results) {
  console.log(results)
})
```

### `item.changeOwner`

> If the permissions on the item are set to private, this action could remove the item from your view entirely. This cannot be undone unless your user has admin permissions.

Reassigns the item to a new user. This will remove the item from the content of the original user, and add it to the content of the new user.

**Params:**
String of a username

**Returns:**
Promise that resolves to a JSON Object of the item

**Example**
```
var item = arcgis.item('itemId')
item.changeOwner('newOwner')
.then(function (results) {
  console.log(results)
})
```

### `item.publish`

Publishes the item to a format that can be added to maps.

**Params:**
Options JSON object

| Options | Default | Description |
| -- | -- | -- |

**Returns:**
Promise that resolves to a JSON Object of the new item

**Example**
```
var options = {
  ???: ???
}
var item = arcgis.item('itemId')
item.publish()
.then(function (results) {
  console.log(results)
})
```

### `item.export`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```

### `item.download`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```

### `item.deleteProtected`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```

### `item.register`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```

### `item.getOAuth`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```

### `item.getToken`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```

### `item.relatedItems`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```

### `item.permissions`

**Params:**

**Returns:**
Promise that resolves to a JSON Object

**Example**
```
var item = arcgis.item('itemId')
item.()
.then(function (results) {
  console.log(results)
})
```


### `item.delete`

Deletes the item.

**Results:**
Promise that resolves to a confirmation of deletion.
```
{
  success: Boolean,
  itemId: String
}
```

**Example**
```
var item = arcgis.item('ItemID')
item.delete()
.then(function (results) {
  console.log(results)
})
```