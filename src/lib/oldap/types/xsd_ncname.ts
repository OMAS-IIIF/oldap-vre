import { OldapErrorInvalidValue } from '$lib/oldap/errors/OldapErrorInvalidValue';


export class NCName {
	ncname?: string;

	constructor(ncname?: string) {
		if (ncname) {
			if (!/^[A-Za-z_][A-Za-z0-9_.-]*$/.test(ncname)) {
				throw new OldapErrorInvalidValue('Invalid NCName format: ' + ncname);
			}
			this.ncname = ncname
		}
	}

	toString() {
		return this.ncname ?? "";
	}
}
