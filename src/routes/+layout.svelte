<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Loginout from '$lib/components/Loginout.svelte';

	let { children } = $props();
</script>

<div class="flexy">
	<div class="top-app-bar-container flexor">
		<TopAppBar variant="static">
			<Row>
				<Section>
					<IconButton class="material-icons">home</IconButton>
					<IconButton class="material-icons">settings</IconButton>
				</Section>
				<Section>
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