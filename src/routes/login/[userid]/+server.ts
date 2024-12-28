import { json } from '@sveltejs/kit';

import type { paths, components } from '$lib/oldap/schemata/oldap_schema'
import createClient, { createPathBasedClient } from 'openapi-fetch';

type EndpointParams = paths["/admin/auth/{userId}"]["parameters"];

type LoginResponse_200 = components['schemas']['auth_response_200'];
type LoginResponse_400 = components['schemas']['auth_response_400'];
type LoginResponse_401 = components['schemas']['auth_response_401'];
type LoginResponse_404 = components['schemas']['auth_response_404'];

/**
 * Posts a login request
 * @param params
 * @param request
 * @constructor
 */
export async function POST({params, request}): Promise<Response> {

	const { userid } = params;
	const { url, password } = await request.json();

	const client = createPathBasedClient<paths>({ baseUrl: url });

	try {
		const {data, error} = await client['/admin/auth/{userId}'].POST({
			params: {path: { userId: userid } },
			headers: { 'Content-Type': 'application/json; utf-8' },
			body: { password: password }
		});
		if (error) {
			return json({ success: false, errormsg: error.message }, { status: 400 });
		}
		return json( { success: true, token: data.token } );
	}
	catch (error) {
		console.error('Error during authentication:', error);
		return json({ success: false, errormsg: 'Internal Server Error' }, { status: 500 });
	}

}
