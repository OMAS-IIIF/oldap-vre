// Define a branded type for IRI
export type Iri = string & { __type: 'Iri' };

// Regular expression for basic IRI validation (can be expanded for stricter rules)
const iriRegex = /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/;

// Factory function to validate and create an IRI
export function createIri(value: string): Iri {
	if (!iriRegex.test(value)) {
		throw new Error(`Invalid IRI: ${value}`);
	}
	return value as Iri;
}