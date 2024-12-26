import { describe, it, expect } from 'vitest';
import { QName } from '$lib/oldap/types/xsd_qname';
import { NCName } from '$lib/oldap/types/xsd_ncname';
import { OldapErrorInvalidValue } from '$lib/oldap/errors/OldapErrorInvalidValue';

describe('QName', () => {
	it('Creates valid QName', () => {
		const instance = new QName(new NCName('my_prefix'), new NCName('my_fragment'));
		expect(instance.toString()).toBe('my_prefix:my_fragment');
	});

	it('Creates valid QName', () => {
		const instance = QName.createQName('test:hallo');
		expect(instance.toString()).toBe('test:hallo');
		expect(instance.prefix).toStrictEqual(new NCName('test'));
		expect(instance.fragment).toStrictEqual(new NCName('hallo'));
	});

	it('Throws an error in a invalid QName (1)', () =>{
		expect(() => QName.createQName('https://gaga.gugus.com/B')).toThrowError(new OldapErrorInvalidValue("Invalid QName format: prefix may not be \"http\", \"https\" or \"urn\""));
	});

	it('Throws an error in a invalid QName (2)', () =>{
		expect(() => QName.createQName('a:b:c')).toThrowError(new OldapErrorInvalidValue("Invalid QName format: \"a:b:c\""));
	});

	it('Throws an error in a invalid QName (3)', () =>{
		expect(() => QName.createQName('a:1b')).toThrowError(new OldapErrorInvalidValue("Invalid QName format: fragment \"1b\" is invalid: OldapErrorInvalidValue: Invalid NCName format: 1b"));
	});

	it('Throws an error in a invalid QName (4)', () =>{
		expect(() => QName.createQName('a a:b')).toThrowError(new OldapErrorInvalidValue("Invalid QName format: prefix \"a a\" is invalid: OldapErrorInvalidValue: Invalid NCName format: a a"));
	});

})