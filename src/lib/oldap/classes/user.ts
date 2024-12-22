

export interface JsonUser {
	userIri: string;
	userId: string;
	isActive: boolean;
	family_name?: string;
	given_name?: string;
	has_permissions?: string[];
	in_project?: {
		[key: string]: string[];
	}
}