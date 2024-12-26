import { OldapError } from '$lib/oldap/errors/OldapError';

export class OldapErrorInvalidValue  extends OldapError {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}