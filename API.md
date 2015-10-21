
# API Reference

## Client

Initializes a set of methods to access the ArcGIS REST API.

### ArcGIS()

Initializes a client with a valid token to make requests. If no token is passed, the client will act as a public instance.

| Params           | Returns                                |
| ---------------- | -------------------------------------- |
| Token (string)   | Object with the below methods          |

```
ArcGIS = require('arcgis')
vat ago = ArcGIS(token)
```

## Organizations

Methods for working with ArcGIS Organizations, also known as Portals.

### getOrganization()

If no OrgId is passed, the method returns the object representing the organization you are a part of. If an an OrgId is passed, the method returns the public view of the Org requested.

| Params         | Returns                                |
| -------------- | -------------------------------------- |
| OrgId (string) | Object representing the organization.  |