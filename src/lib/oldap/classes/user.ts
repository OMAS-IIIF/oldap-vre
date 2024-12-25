import { NCName } from '$lib/oldap/types/xsd_ncname';
import { Iri } from '$lib/oldap/types/xsd_iri';
import type { QName } from '$lib/oldap/types/xsd_qname';
import { AdminPermission, stringToAdminPermission } from '$lib/oldap/enums/admin_permissions';


export interface InProject {
	project: Iri;
	permissions: AdminPermission[]
}

export class User {
	#userIri: Iri;
	#userId: NCName;
	isActive?: boolean;
	familyName?: string;
	givenName?: string;
	inProject?: InProject[];
	hasPermissions?: QName[];

	constructor(userIri: Iri,
							userId: NCName,
							isActive?: boolean,
							familyName?: string,
							givenName?: string,
							inProject?: {project: Iri;
								permissions?: AdminPermission[]}[],
							hasPermissions?: QName[]) {
		this.#userIri = userIri;
		this.#userId = userId;
		this.isActive = isActive;
		this.familyName = familyName;
		this.givenName = givenName;
		this.inProject = inProject
		this.hasPermissions = hasPermissions
	}

	get userIri() {
		return this.#userIri;
	}

	get userId() {
		return this.#userId;
	}

	static fromOldapJson(obj: any): User {
		let userIri: Iri;
		let userId: NCName;
		let isActive: boolean;

		if (obj?.userIri !== undefined && typeof obj.userIri === 'string') {
			userIri = new Iri(obj.userIri);
		}
		else {
			throw new Error(`${obj?.userIri} is not a valid user Iri`);
		}
		if (obj?.userId !== undefined && typeof obj.userId === 'string') {
			userId = new NCName(obj.userId);
		}
		else {
			throw new Error(`${obj?.userId} is not a valid user ID`);
		}
		if (obj?.isActive !== undefined && typeof obj.isActive === 'boolean') {
			isActive = obj?.isActive;
		}
		else {
			throw new Error(`${obj?.isActive} is not a valid Boolean`);
		}
		const user = new User(userIri, userId, isActive)

		if (obj?.family_name !== undefined && typeof obj.family_name === 'string') {
			user.familyName = obj.family_name;
		}
		if (obj?.given_name !== undefined && typeof obj.given_name === 'string') {
			user.givenName = obj.given_name;
		}
		if (obj?.in_projects !== undefined) {
			if (Array.isArray(obj.in_projects)) {
				const in_projects = obj.in_projects.map((item: {project: string, permissions: string[]}): InProject => {
					const permissions = item.permissions.map((x) => (stringToAdminPermission(x)))
					if (permissions === undefined) {
						throw new Error(`${obj?.in_permissions} is not a valid AdminPermission`);
					}
					return {
						project: new Iri(item.project),
						permissions: permissions as AdminPermission[],
					}
				});
				user.inProject = in_projects;
			}
		}
		if (obj?.has_permissions !== undefined) {
			if (Array.isArray(obj.has_permissions)) {
				user.hasPermissions = obj.has_permissions.map((x: string) => (new Iri(x)));
			}
			else {
				throw new Error(`${obj.has_permissions} is not a valid permission`);
			}
		}
		return user;
	}
}