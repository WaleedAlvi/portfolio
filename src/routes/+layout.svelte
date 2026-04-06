<script lang="ts">
	import '$lib/styles/theme.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/images/logo_circle.png" />
	<title>Waleed Alvi — Software Engineer</title>
</svelte:head>

<Nav />

<div class="app-shell">
	<main class="main-content">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app-shell {
		margin-left: var(--nav-width);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-content {
		flex: 1;
		padding: var(--space-16) var(--space-12);
		max-width: var(--content-max-width);
	}

	@media (max-width: 767px) {
		.app-shell {
			margin-left: 0;
			padding-top: 56px;
		}

		.main-content {
			padding: var(--space-8) var(--space-5);
		}
	}
</style>
