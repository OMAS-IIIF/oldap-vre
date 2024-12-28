import { json } from '@sveltejs/kit';

import type { paths, components } from '$lib/oldap/schemata/oldap_schema'
import createClient, { createPathBasedClient } from 'openapi-fetch';


export async function GET({params, request}): Promise<Response> {
	const { userid } = params;
	const server = request.headers.get('oldap-server') ?? 'http://127.0.0.1:8000';
	const token = request.headers.get('oldap-token') ?? ''

	const client = createPathBasedClient<paths>({ baseUrl: server });

	try {
		const {data, error} = await client['/admin/user/{userId}'].GET({
			params: { path: { userId: userid } },
			headers: {
				'Content-Type': 'application/json; utf-8',
				'Authorization': 'Bearer ' + token,
			},
		})
		if (error) {

		}
	}
	catch (error) {
		console.error('Error getting user information:', error);
		const err = error as Error;
		return new Response(null, {status: 500, statusText: err.message as string});

	}

	try {
		const res = await fetch(server + '/admin/user/' + userid, {
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
		});
		return res;
	}
	catch (error) {
		console.error('Error getting user information:', error);
		const err = error as Error;
		return new Response(null, {status: 500, statusText: err.message as string});
	}
}