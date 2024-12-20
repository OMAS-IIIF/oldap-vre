import { writable } from 'svelte/store';

export const accessinfo = writable({
	server: '',
	token: '',
});