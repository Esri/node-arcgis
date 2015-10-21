
# API Reference

- Client
- User
- Organization
	- Items
	- Featured Content
	- Members
- Content
	- Items
		- New Item
		- Edit Item
		- Favorite Item
		- Rate Item
		- Copy Item
	- Layers
		- Add Feature
		- Edit Visualization
		- Download Data
	- Maps
	- Apps
- Group
	- Content
	- Members
- Usage
	- Summary
	- Top Users
	- Products
	- Application
	- Layer
	- Map
- Analysis


## Client

Initializes a set of methods to access the ArcGIS REST API.

### ArcGIS()

Initializes a client with a valid token to make requests. If no token is passed, the client will act as a public instance.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Token          | String       | none                    |

#### Returns
```
{
  request: function(),
  etc,
}
```

## Organizations

Methods for working with ArcGIS Organizations, also known as Portals.

### getOrganization()

If no OrgId is passed, the method returns the object representing the organization you are a part of. If an an OrgId is passed, the method returns the public view of the Org requested.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| OrgId          | String       | none                    |

#### Returns
```
{

}
```



