***

# `ArcGIS`

> This is a cool note about the below text

Initialize the client library session to access the API either as an anonymous user, or as an authenticated member of an organization.

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
  auth: function,
  request: function,
  user: function,
  organization: function,
  group: function,
  item: function,
  items: function,
  favorites: function,
  usage: function,
  billing: function,
  search: function
}
```

**Example**

> You can probably set up multiple of these suckers in one session to have access to public and private stuff at the same time. How neat!

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

## User

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Username       | String       | none                    |

**Returns Promise**

JSON User object with User management methods.

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

### user.create()

Invites users to join a group.

**Options**

| Options        | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| subject        | String       | Subject of invitation email |
| html           | String       | HTML string of message body |
| invitations    | Array | Invitation Objects to create invitations from |

**Invitation Object**
| Param | Type | Description |
| - | - | - |
| username  | The username for the new user
| password  | The password for the new user. If blank, the new user will set it themselves.
| firstname | The users first name
| lastname  | The users last name
| fullname  | The users full name
| email     | The email address to send the invitation, and link to the users account.
| role      | The role of the user. Editor / User.

**Returns**
Newly created user invitation

**Example**

```
arcgis.user().create(options)
.then(function (invitation) {
	console.log(invitation)
})
```

### user.get

**Returns**
```
// always returned on any user
  "created": Date            // when this user was created
  "firstName": String        // recorded first name of the user
  "fullName": String         // recorded name of the user
  "lastName": String         // recorded last name of the user
  "provider": String         // ???
  "username": String         // hard username for the user. Never changes.
// the following are not returned if the user is private
  "culture": String          // two letter lang code ex: 'en'
  "description": String      // text description set by the user
  "modified": Date           // date when the user
  "region": String           // two letter country code ex: 'us'
  "tags": Array              // array of tags that user has used maybe?
  "thumbnail": String        // name of the users thumbnail image ex: 'coolguy.jpg'
  "units": String,            // 'imperial' or 'metric'
```

**Example**
```
user.get()
.then(function (profile){
  console.log(profile)
})
```

### user.update

Takes an options object, and sets the users information to the options provided. Returns an error, or the updated user object.

**Options**

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

**Returns**

The updated user object.

**Example**

```
user.update({
	preferredView: 'GIS',
	description: 'I am a GIS analyst.'
})
```

### user.delete

Deletes the user.

### user.content

Gets the users content by folder id. If no folder id is supplied, returns all the items at the users root folder.

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Folder ID      | String       | none                    |

**Returns**

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

### user.favorites

Gets the items the user has favorited.

**Returns**

Paginated search results object.

```
{
	num: Number,       // Total number of items that could be returned
	total: Number,     // Total numnber of items in favorites
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

### user.tags

Gets all the tags that a user has used, along with counts of hoy many times that tag has appeared.

**Returns**
```
{
	tags: Array // array of tag objects
}
```

Tag Object
```
{
	count: Number, // Number of times the tag appears
	tag: String    // String of the tag itself
}
```

### user.enabled

Enables and disables the user within the organization. Default returns the current status of the user.

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| User Enabled   | Boolean      | none                    |

**Returns**


## Organization

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Org Id         | String       | self                    |

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

### organization.update

updates org information


### organization.users

gets users in an org as a paginated object.

**Example**

```
var myOrg = arcgis.organization()
myOrg.users()
.then(function(results) {
	console.log(results)
})
```

### organization.content

gets content in an org as a paginated object

**Example**

```
var myOrg = arcgis.organization()
myOrg.content()
.then(function(results) {
	console.log(results)
})
```

### organization.featured

gets the orgs featured content

**Example**

```
var myOrg = arcgis.organization()
myOrg.content()
.then(function(results) {
	console.log(results)
})
```

### organization.summary

gets and sets the short summary of an org

**Example**

```
var myOrg = arcgis.organization()
myOrg.summary()
.then(function(results) {
	console.log(results)
})
```

### organization.language

gets the organizations language settings

**Examples**

```
var myOrg = arcgis.organization()
myOrg.language()
.then(function(results) {
	console.log(results)
})
```

## Group

### group().create

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
Newly created group object

**Example**

```
arcgis.group().create(options)
.then(function (group) {
	console.log(group)
})
```

creates a new group?

### group.update

updates group information

### group.delete

deletes a group

### group.content

gets the content in a group

### group.users

adds a user to a group, via invitation if needed. If options is null, returns users in a group

### group.removeUser

kicks a user out of a group

### group.join

request an invitation for a user to a group

### group.leave

leave a group

### group.changeOwner

changes the owner of a group

## Item

Creates an object with methods for interacting with items.

**Params***

**Returns**

Not all methods are returned on all items. Items will only return methods that are applicable to the item itself. For example, only items designated as Apps with have oAuth methods, and only items containing geographic data will have publishing methods.

```
{
	get: function(),             // Gets the item
	new: function(),             // Creates a new item
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

### item.get

Returns an items JSON

### item.new

creates a new item

### item.update

updates an items information.

### item.delete

deletes an item.

### item.createService

Creates a new feature service for hosted data?.

### item.folder

Returns the folder of an item, or adds an item to a folder.

### item.groups

Returns the groups an item is a part of, adds item to one or more groups.

### item.owner

returns the items owner, changes the owner of an item.

### item.favorite

adds item to favorites, removes item from favorites.

### item.rating

Gets an item rating, rates an item, or removes a rating on an item.

### item.publish

publishes a static data item to a usable layer.

### item.export

exports item as selected data type.

### item.data

gets the data behind an item, updates the data behind an item?

### item.deleteProtected

sets delete protection status.

### item.register

registers an item as an application.

### item.oAuth

returns oauth information for an app.

### item.relatedItems

returns items related to an item.

### item.permissions

sets permissions on an item to self, org, or public. If options is null,
returns current permissions.

### item.comments

Gets all the comments on an item.

#### item.comments.add

adds a comment to the item, if possible

#### item.comments.comment

returns a particular comment on an item

##### item.comments.comment.edit

edit the content of a comment

##### item.comments.comment.delete

deletes a comment from the item


