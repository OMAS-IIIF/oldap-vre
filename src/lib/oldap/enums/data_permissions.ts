export enum DataPermissions {
	DATA_RESTRICTED = 'oldap:DATA_RESTRICTED', // Allow only restricted view of resource data which means that "restricted" fields are not visible
	DATA_VIEW = 'oldap:DATA_VIEW', // Allow full view of resource data
	DATA_EXTEND = 'oldap:DATA_EXTEND', // Allow to *add* data items to the resource
	DATA_UPDATE = 'oldap:DATA_UPDATE', // Allow to *add/modify/delete* data fields of resource
	DATA_DELETE = 'oldap:DATA_DELETE', // Allow to delete complete resource
	DATA_PERMISSIONS = 'oldap:DATA_PERMISSIONS' // Allow to modify permissions of resource
}
