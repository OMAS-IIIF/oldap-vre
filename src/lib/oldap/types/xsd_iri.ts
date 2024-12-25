// Define a branded type for IRI
//export type Iri = string & { __type: 'Iri' };

// Regular expression for basic IRI validation (can be expanded for stricter rules)
import { QName } from '$lib/oldap/types/xsd_qname';
import { NCName } from '$lib/oldap/types/xsd_ncname';

const iriRegex = /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/;

// Factory function to validate and create an IRI
/*
export function createIri(value: string): Iri {
	if (!iriRegex.test(value)) {
		throw new Error(`Invalid IRI: ${value}`);
	}
	return value as Iri;
}
*/

export class Iri {
	iri: string | QName | null = null;
	representation: "FULL" | "QNAME" | null = null;


	constructor(iri?: string);
	constructor(qname: QName);
	constructor(prefix: string, fragment: string);
	constructor(prefix: NCName, fragment: NCName);
	constructor(iri?: string | QName | NCName, fragment?: string | NCName) {
		if (iri === undefined) {
			this.iri = null;
		}
		else if (typeof iri === 'string' && fragment === undefined) {
			const parts = iri.split(':');
			if (parts.length != 2) {
				throw new Error("Invalid IRI format");
			}
			if (parts[0] === "http" || parts[0] === "https" || parts[1] === "urn") {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const parsed = new URL(iri);
				this.iri = iri;
				this.representation = "FULL";
			}
			else {
				this.iri = iri;
				this.representation = "QNAME";
			}
		}
		else if (iri instanceof QName && fragment === undefined) {
			this.iri = iri;
			this.representation = "QNAME";
		}
		else if (typeof iri === "string" && typeof fragment === "string") {
			const p = new NCName(iri);
			const f = new NCName(fragment);
			this.iri = new QName(p, f);
			this.representation = "QNAME";
		}
		else if (iri instanceof NCName && fragment instanceof NCName) {
			this.iri = new QName(iri, fragment);
			this.representation = "QNAME";
		}
		else {
			throw new Error("Invalid IRI format: iri=" + iri + " fragment=" + fragment);
		}
	}

	toString(): string {
		if (typeof this.iri === "string") {
			return this.iri;
		}
		else {
			return this.iri?.toString() ?? "";
		}
	}
}
