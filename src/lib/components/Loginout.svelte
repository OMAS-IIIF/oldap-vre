<script lang="ts">
	import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import { Icon } from '@smui/fab';
	import HelperText from '@smui/select/helper-text';

	import { accessInfoStore } from '$lib/stores/accessinfo.js';
	import { User } from '$lib/oldap/classes/user';

	const apiUrl = import.meta.env.VITE_API_URL;

	let openLogin = $state(false);
	let openLogout = $state(false);
	// let token = $state(token);
	let oldap_url = $state(apiUrl);
	let userid = $state('')
	let password = $state('')
	let userid_to_show = $state('')


	let clicked = $state('Nothing yet.'); // TODO! for build only

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
		const res2 = await response2.json();


		let user: User;
		try {
			user = User.fromOldapJson(res2);
			accessInfoStore.set({
				server: oldap_url,
				token: res.token,
				user: user,
			})
			userid_to_show = user.userId.toString();
			console.log("USER:", user)
		}
		catch (err) {
			console.error(err);
		}

		openLogin = false;
	};

	function logout() {
		accessInfoStore.set(null);
		userid_to_show = '';
		return true;
	}

</script>

<Dialog
	bind:open={openLogin}
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

<Dialog
	bind:open={openLogout}
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
>
	<Title id="simple-title">Logout</Title>
	<Content id="simple-content">Do You really want to logout?</Content>
	<Actions>
		<Button onclick={() => {}}>
			<Label>No</Label>
		</Button>
		<Button onclick={() => logout()}>
			<Label>Yes</Label>
		</Button>
	</Actions>
</Dialog>


{#if userid_to_show}
	<IconButton class="material-icons" aria-label="Logout" onclick={() => (openLogout = true)}>login</IconButton>
{:else}
	<IconButton class="material-icons" aria-label="Login" onclick={() => (openLogin = true)}>login</IconButton>
{/if}

