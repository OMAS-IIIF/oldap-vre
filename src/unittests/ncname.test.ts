import { describe, it, expect } from 'vitest';
import { NCName } from '$lib/oldap/types/xsd_ncname';
import { OldapErrorInvalidValue } from '$lib/oldap/errors/OldapErrorInvalidValue';

describe('NCNAME', () => {
	it('Creates a valid NCname', async () => {
		const instance = await new NCName('myid');
		expect(instance.toString()).toBe('myid');
	})

	it('Creates an empty NCName', async () => {
		const instance = await new NCName();
		expect(instance.toString()).toBe("")
	})

	it('Throws an error while creating NC name (1)', async () => {
		const noname = 'no:ncname';
		expect(() => new NCName(noname)).toThrowError(new OldapErrorInvalidValue('Invalid NCName format: ' + noname));
	});

	it('Throws an error while creating NC name (2)', async () => {
		const noname = 'no name';
		expect(() => new NCName(noname)).toThrowError(new OldapErrorInvalidValue('Invalid NCName format: ' + noname));
	});

	it('Throws an error while creating NC name (3)', async () => {
		const noname = '1invalid';
		expect(() => new NCName(noname)).toThrowError(new OldapErrorInvalidValue('Invalid NCName format: ' + noname));
	});


})