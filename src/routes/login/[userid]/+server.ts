import { json } from '@sveltejs/kit';

/**
 * Posts a login request
 * @param params
 * @param request
 * @constructor
 */
export async function POST({params, request}): Promise<Response> {

	const { userid } = params;
	const { url, password } = await request.json();

	try {
		const res = await fetch(url + '/admin/auth/' + userid, {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json'
			},
			'body': JSON.stringify({
				'password': password
			})
		});
		if (res.ok) {
			const logindata = await res.json();
			console.log(logindata);
			return json({ success: true, token: logindata.token }, { status: 200 });
		}
		else {
			const error = await res.json();
			const errorMessage = error.message;

			return json({ success: false, errormsg: errorMessage }, { status: 401 });
		}
	} catch (error) {
		console.error('Error during authentication:', error);
		return json({ success: false, errormsg: 'Internal Server Error' }, { status: 500 });
	}
}
