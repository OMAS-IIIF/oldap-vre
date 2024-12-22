import { json } from '@sveltejs/kit';
import type { JsonUser } from '$lib/oldap/classes/user';

export async function GET({params, request}): Promise<Response> {
	const { userid } = params;
	const server = request.headers.get('oldap-server')
	const token = request.headers.get('oldap-token')
	try {
		const res = await fetch(server + '/admin/user/' + userid, {
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
		});
		return res;
		/*
		if (res.ok) {
			const user = await res.json() as JsonUser;
			return json({ success: true, data: user }, { status: 200 });
		}
		else {
			const error = await res.json();
			const errorMessage = error.message;
			return json({ success: false, errormsg: errorMessage }, { status: 401 });
		}
		 */
	}
	catch (error) {
		console.error('Error getting user information:', error);
		const err = error as Error;
		return new Response(null,new ResponseInit(null, 500, err.message as string));
	}
}