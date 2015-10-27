
# API Reference

## ArcGIS()

Initializes a client with a valid token to make requests. If no token is passed, the client will act as a public instance.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Token          | String       | none                    |

## Organizations

Methods for working with ArcGIS Organizations, also known as Portals.

### `organization.getOrganization()`

If no OrgId is passed, the method returns the object representing the organization you are a part of. If an an OrgId is passed, the method returns the public view of the Org requested.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| OrgId          | String       | none                    |

### `organization.getUsers()`

Gets a paginated list of an organizations members, with `num` users per page. If no OrgId is passed, the method returns the object representing the organization you are a part of.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| OrgId          | String       | none                    |
| Num            | Number       | 100                     |

### `organization.getContent()`

Gets a paginated list of an organizations items, with `num` items per page. If no OrgId is passed, the method returns the object representing the organization you are a part of.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| OrgId          | String       | none                    |
| Num            | Number       | 100                     |

### `organization.getSummary()`

Returns a small, plain text summary of the organization. If no OrgId is passed, the method returns the object representing the organization you are a part of.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| OrgId          | String       | none                    |

## Content

## Groups

## Usage

### `usage.getSummary()`

Returns graph data and usage summary for the organization the token is valid for.

#### Parameters
| Params         | Type         | Default                 |
| -------------- | ------------ | ----------------------- |
| Start          | Date         | One month ago           |
| End            | Date         | Now                     |
| Period         | String       | '1d'                    |
