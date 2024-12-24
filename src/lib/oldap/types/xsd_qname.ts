import { NCName } from '$lib/oldap/types/xsd_ncname';
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
			throw new Error("Imvalid QName format")
		}
		return new QName(new NCName(parts[0]), new NCName(parts[1]));
	}
}

