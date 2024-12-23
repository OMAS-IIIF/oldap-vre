
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
	}
	catch (error) {
		console.error('Error getting user information:', error);
		const err = error as Error;
		return new Response(null, {status: 500, statusText: err.message as string});
	}
}