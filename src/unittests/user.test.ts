import { describe, it, expect } from 'vitest';
import { User } from '$lib/oldap/classes/user';
import { NCName } from '$lib/oldap/types/xsd_ncname';
import { Iri } from '$lib/oldap/types/xsd_iri';

describe('Users', () => {
	it('Should return a valid user', async () => {
		const id = new NCName('dduck')
		const user1 = new User(new Iri('http://example.org/user/dd'), id);
		expect(user1.userId).toBe(id)
	})

})