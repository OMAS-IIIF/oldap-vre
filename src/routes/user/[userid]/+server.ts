import { json } from '@sveltejs/kit';

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
		if (res.ok) {
			const userdata = await res.json();
			return json({ success: true, data: userdata }, { status: 200 });
		}
		else {
			const error = await res.json();
			const errorMessage = error.message;
			return json({ success: false, errormsg: errorMessage }, { status: 401 });
		}
	}
	catch (error) {
		console.error('Error getting user imnformation:', error);
		return json({ success: false, errormsg: 'Error getting user imnformation.' }, { status: 500 });
	}
}