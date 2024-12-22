<script lang="ts">
	import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import { Icon } from '@smui/fab';
	import HelperText from '@smui/select/helper-text';

	import { accessinfo } from '$lib/states/accessinfo.js'
	import { get } from 'svelte/store';
	import type { JsonUser } from '$lib/oldap/classes/user';

	const apiUrl = import.meta.env.VITE_API_URL;

	let open = $state(false);
	// let token = $state(token);
	let oldap_url = $state(apiUrl);
	let userid = $state('')
	let password = $state('')

	const handleSubmit = async () => {
		if (!userid || !password) {
			//errorMessage = 'userid or password missing';
			return false;
		}
		//errorMessage = '';
		const response = await fetch('/login/' + userid, {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json'
			},
			'body': JSON.stringify({
				'url': oldap_url,
				'password': password
			})
		});
		const res = await response.json();
		if (!res.success) {
			//errorMessage = res.errormsg;
			console.log("ERROR:", res.errormsg);
			return false;
		}
		console.log("SUCCESS:", res.token);
		accessinfo.set({
			server: oldap_url,
			token: res.token,
		});

		const response2 = await fetch('/user/' + userid, {
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json',
				'oldap-server': oldap_url,
				'oldap-token': res.token
			},
		});
		if (!response2.ok) {
			const errmsg = await response2.text();
			throw Error(errmsg);
		}
		const res2 = await response2.json() as JsonUser;
		console.log("USER:", res2)

		open = false;
	};

</script>

<Dialog
	bind:open
	aria-labelledby="default-focus-title"
	aria-describedby="default-focus-content"
>
	<Title id="default-focus-title">Login</Title>
	<Content id="default-focus-content">
		<form>
			<Textfield
				type="url"
				variant="outlined"
				required
				style="margin-top: 1rem;"
				bind:value={oldap_url} label="URL">
				{#snippet trailingIcon()}
					<Icon class="material-icons" onclick={() => oldap_url = ''}>delete</Icon>
				{/snippet}
				{#snippet helper()}
					<HelperText>Enter the URL of a OLDAP server</HelperText>
				{/snippet}
			</Textfield>
			<Textfield
				type=""
				variant="outlined"
				required
				style="margin-top: 1rem;"
				bind:value={userid} label="Userid">
				{#snippet trailingIcon()}
					<Icon class="material-icons" onclick={() => userid = ''}>delete</Icon>
				{/snippet}
				{#snippet helper()}
					<HelperText>Enter a valid user ID</HelperText>
				{/snippet}
			</Textfield>
			<Textfield
				type="password"
				variant="outlined"
				required
				style="margin-top: 1rem;"
				bind:value={password} label="Password">
				{#snippet trailingIcon()}
					<Icon class="material-icons" onclick={() => password = ''}>delete</Icon>
				{/snippet}
				{#snippet helper()}
					<HelperText>Enter a valid password</HelperText>
				{/snippet}
			</Textfield>

		</form>
	</Content>
	<Actions>
		<Button variant="raised">
			<Label>Cancel</Label>
		</Button>
		<Button
			variant="raised"
			defaultAction
			use={[InitialFocus]}
			onclick={() => handleSubmit()}
		>
			<Label>Login</Label>
		</Button>
	</Actions>
</Dialog>

<IconButton class="material-icons" aria-label="Login" onclick={() => (open = true)}>login</IconButton>
