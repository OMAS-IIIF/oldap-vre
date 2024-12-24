<script lang="ts">
	import '@material/typography/dist/mdc.typography.css';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Loginout from '$lib/components/Loginout.svelte';
	import { type AccessInfo, accessInfoStore } from '$lib/stores/accessinfo';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';
	import Menu from '@smui/menu';
	import type { InProject } from '$lib/oldap/classes/user';

	let { children } = $props();
	let accessInfo: AccessInfo | null = $state(null);
	accessInfoStore.subscribe((value) => {accessInfo = value ? value as AccessInfo : null;});

	const in_projects: InProject[] = $derived.by(() => {
		if (accessInfo) {
			return accessInfo.user?.in_projects;
		}
		else {
			return [];
		}
	});

	let menu: Menu;

</script>

<div class="flexy">
	<div class="top-app-bar-container flexor">
		<TopAppBar variant="static">
			<Row>
				<Section>
					<Text>OLDAP</Text>
					<IconButton class="material-icons" href="/">home</IconButton>
					<IconButton class="material-icons" href="/admin">settings</IconButton>
				</Section>
				<Section align="end">
					{#if accessInfo}
						<label class="mdc-typography--body1" for="input-id">User: {accessInfo.user.userId}</label>
						<div style="width: 20px"> </div>
						<div>
							<Button variant="raised" onclick={() => menu.setOpen(true)}>
								<Label>Select project</Label>
							</Button>
							<Menu bind:this={menu}>
								<List>
									{#each in_projects as project}
										<Item onSMUIAction={() => {}}>
											<Text>{project.project}</Text>
										</Item>
									{/each}
									<Separator />
									<Item onSMUIAction={() => {}}>
										<Text>No project</Text>
									</Item>
								</List>
							</Menu>
						</div>
					{/if}
					<!-- <IconButton class="material-icons" aria-label="Login" onclick={() => alert("LOGIN")}>login</IconButton> -->
					<Loginout />
				</Section>
			</Row>
		</TopAppBar>
		<div>
			{@render children()}
		</div>
	</div>
</div>



<style>

    .top-app-bar-container {
        width: 100%;
        height: 100%;
        border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
        margin: 0 18px 18px 0;
        background-color: var(--mdc-theme-background, #fff);
        overflow: auto;
        display: inline-block;
    }

    @media (max-width: 480px) {
        .top-app-bar-container {
            margin-right: 0;
        }
    }

    .flexy {
        display: flex;
        flex-wrap: wrap;
    }

    .flexor {
        display: inline-flex;
        flex-direction: column;
    }

    .flexor-content {
        flex-basis: 0;
        height: 0;
        flex-grow: 1;
        overflow: auto;
    }
</style>