# ArcGIS

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Token          | String       | none                    |

**Returns**

JSON Object with ArcGIS methods.

```
{
  auth: function(options),
  request: function(url, form, rootURL),
  user: function(options),
  organization: function(options),
  group: function(options),
  item: function(options),
  items: function(options),
  favorites: function(options),
  usage: function(options),
  billing: function(options),
  search: function(options)
}
```

**Example**

```
var ArcGIS = require('arcgis')
var ago = ArcGIS('token')
```



## User

**Params**

| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Username       | String       | 'Self'                  |

**Returns**

JSON User object with User management methods.

```
{
  "created": Date       // when this user was created
  "firstName": String   // recorded first name of the user
  "fullName": String    // recorded name of the user
  "lastName": String    // recorded last name of the user
  "provider": String    // ???
  "username": String    // hard username for the user. Never changes.
  "culture": String     // Private. two letter lang code ex: 'en'
  "description": String // Private. text description set by the user
  "modified": Date      // Private. date when the user
  "region": String      // Private. two letter country code ex: 'us'
  "tags": Array         // Private. array of tags that user has used maybe?
  "thumbnail": String   // Private. name of the users thumbnail image ex: 'coolguy.jpg'
  "units": String       // Private. 'imperial' or 'metric'
}

```

**Example**

```

```