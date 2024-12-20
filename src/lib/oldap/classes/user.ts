import type { QName } from '$lib/oldap/types/xsd_qname';
import type { InProject } from '$lib/oldap/classes/in_project';


export class User {
	userIri: string;
	userId: string;
	familyName?: string;
	givenName?: string;
	hasPermissions?: Array<QName>;
	inProject?: Array<InProject>

	constructor(userIri: string,
							userId: string,
							familyName?: string,
							givenName?: string,
							hasPermissions?: Array<QName>,
							inProject?: Array<InProject>) {
		this.userIri = userIri;
		this.userId = userId;
		this.familyName = familyName;
		this.givenName = givenName;
		this.hasPermissions = hasPermissions;
		this.inProject = inProject;
	}
}