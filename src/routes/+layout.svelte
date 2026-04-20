<script lang="ts">
	import '$lib/styles/theme.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

	let { children } = $props();

	onMount(() => {
		if (!PUBLIC_GA_MEASUREMENT_ID) return;

		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_MEASUREMENT_ID}`;
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		};
		window.gtag('js', new Date());
		window.gtag('config', PUBLIC_GA_MEASUREMENT_ID);
	});

	afterNavigate(() => {
		if (!PUBLIC_GA_MEASUREMENT_ID || !window.gtag) return;
		window.gtag('config', PUBLIC_GA_MEASUREMENT_ID, {
			page_path: window.location.pathname
		});
	});
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
