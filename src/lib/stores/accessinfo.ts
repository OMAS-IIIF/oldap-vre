import { writable } from 'svelte/store';
import type { User } from '$lib/oldap/classes/user';

export interface AccessInfo {
	server: string;
	token: string;
	user: User;
}

export const accessInfoStore = writable<AccessInfo | null>(null);