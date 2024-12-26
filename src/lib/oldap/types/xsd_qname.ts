import { NCName } from '$lib/oldap/types/xsd_ncname';
import { OldapErrorInvalidValue } from '$lib/oldap/errors/OldapErrorInvalidValue';
/*
export type QName = `${string}:${string}` & { __type: 'QName' };

export function createQName(value: string): QName {
	if (!/^[a-zA-Z_][\w.-]*:[a-zA-Z_][\w.-]*$/.test(value)) {
		throw new Error('Invalid QName format');
	}
	return value as QName;
}
*/
export class QName {
	prefix: NCName
	fragment: NCName

	constructor(prefix: NCName, fragment: NCName) {
		this.prefix = prefix;
		this.fragment = fragment;
	}

	toString() {
		return this.prefix.toString() + ':' + this.fragment.toString();
	}

	static createQName(qname: string): QName {
		const parts = qname.split(':')
		if (parts.length != 2) {
			throw new OldapErrorInvalidValue(`Invalid QName format: "${qname}"`)
		}
		if (parts[0] === 'http' || parts[0] === 'https' || parts[0] === 'urn') {
			throw new OldapErrorInvalidValue("Invalid QName format: prefix may not be \"http\", \"https\" or \"urn\"")
		}
		let p: NCName;
		try {
			p = new NCName(parts[0]);
		}
		catch (e) {
			throw new OldapErrorInvalidValue(`Invalid QName format: prefix "${parts[0]}" is invalid: ${e}`)
		}
		let f: NCName;
		try {
			f = new NCName(parts[1]);
		}
		catch (e) {
			throw new OldapErrorInvalidValue(`Invalid QName format: fragment "${parts[1]}" is invalid: ${e}`)
		}
		return new QName(p, f);
	}
}

