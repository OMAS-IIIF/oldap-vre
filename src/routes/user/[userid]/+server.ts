import { json } from '@sveltejs/kit';
import { User } from '$lib/oldap/classes/user';
import { createQName, type QName } from '$lib/oldap/types/xsd_qname';

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
			const hasperms = userdata.has_permissions.map((s: string) : QName => createQName(s))
			const user = new User(userdata.userIri,
				userdata.userId,
				userdata.family_name,
				userdata.given_name,
				hasperms);
			return json({ success: true, data: user }, { status: 200 });
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