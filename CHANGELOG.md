# node-arcgis change log

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

### [Unreleased](unreleased)

## [1.0.2]

### Added

- `item.create`
- `item.data`

### Fixed

- Updated Search doc to identify `queryString` as the supported input parameter.

## [1.0.1]

### Fixed

- A number of Organization methods
- Recursive item methods (getting within getting, etc) add methods to item object.

### Modified

- `arcgis.request` callback pattern simplified
- `end` processes needs not return callback, just calls it.

## 1.0.0 - DEPRECATED

## [1.0.0-beta.1]

Initial Release. Methods using promises, or optional callbacks.

- Arcgis
	- Request
	- Search
	- User
		- Overview
		- Update
		- Content
		- Tags
		- Favorites
		- Enabled
		- Delete
	- Organization
		- Overview
		- Update
		- Members
		- Content
		- Featured
	- Group
		- Overview
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
	- Item
		- Overview
		- Update
		- Permissions
		- Rate
		- IsFavorite
		- Favorite
		- Groups
		- ChangeOwner
		- DeleteProtected
		- Delete
	- Layer
		- Overview
		- Data
		- Export
	- Map
		- Overview
		- Layers
	- Application
		- Overview
		- Register
		- GetOAuth
		- GetToken
	- File
		- Overview
		- Publish
		- Download

[unreleased]: https://github.com/Esri/node-arcgis/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/Esri/node-arcgis/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Esri/node-arcgis/compare/v1.0.0-beta.1...v1.0.1
[1.0.0-beta.1]: https://github.com/Esri/node-arcgis/releases/tag/v1.0.0-beta.1
