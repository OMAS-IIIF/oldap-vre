export type QName = `${string}:${string}` & { __type: 'QName' };

export function createQName(value: string): QName {
	if (!/^[a-zA-Z_][\w.-]*:[a-zA-Z_][\w.-]*$/.test(value)) {
		throw new Error('Invalid QName format');
	}
	return value as QName;
}