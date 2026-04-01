<script lang="ts">
	import { portfolio } from '$lib/data/portfolio';
	import Icon from '$lib/components/Icon.svelte';
	import { List, X } from 'phosphor-svelte';

	const navLinks = [
		{ href: '#about', label: 'About', icon: 'user' },
		{ href: '#experience', label: 'Work', icon: 'building-office' },
		{ href: '#projects', label: 'Projects', icon: 'code' },
		{ href: '#interests', label: 'Interests', icon: 'circuitry' }
	];

	let mobileOpen = $state(false);
	let activeHash = $state('');

	function scrollTo(hash: string) {
		const el = document.querySelector(hash);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
		activeHash = hash;
		mobileOpen = false;
	}

	function handleNavClick(e: MouseEvent, href: string) {
		e.preventDefault();
		scrollTo(href);
		history.replaceState(null, '', href);
	}

	function setupObserver() {
		const ids = navLinks.map((l) => l.href.slice(1));
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeHash = `#${entry.target.id}`;
					}
				}
			},
			{ rootMargin: '-20% 0px -60% 0px' }
		);

		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	}

	$effect(() => {
		const cleanup = setupObserver();
		return cleanup;
	});
</script>

<nav class="sidebar" aria-label="Main navigation">
	<div class="sidebar-brand">
		<span class="brand-text">{portfolio.name}</span>
		<span class="brand-sub">{portfolio.title}</span>
		<p class="brand-headline">{portfolio.heroHeadline}</p>
	</div>

	<ul class="nav-links">
		{#each navLinks as link}
			<li>
				<a
					href={link.href}
					class="nav-link"
					class:active={activeHash === link.href}
					onclick={(e) => handleNavClick(e, link.href)}
				>
					<span class="nav-icon"><Icon name={link.icon} size={20} /></span>
					<span class="nav-label">{link.label}</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="sidebar-footer">
		{#each portfolio.socialLinks as social}
			<a
				href={social.url}
				class="social-link"
				target={social.platform !== 'email' ? '_blank' : undefined}
				rel={social.platform !== 'email' ? 'noopener noreferrer' : undefined}
				aria-label={social.label}
			>
				<Icon name={social.icon} size={20} />
			</a>
		{/each}
	</div>
</nav>

<header class="mobile-bar">
	<span class="mobile-brand">Portfolio</span>
	<button
		class="hamburger"
		onclick={() => (mobileOpen = !mobileOpen)}
		aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
		aria-expanded={mobileOpen}
	>
		{#if mobileOpen}
			<X size={24} weight="light" />
		{:else}
			<List size={24} weight="light" />
		{/if}
	</button>
</header>

{#if mobileOpen}
	<div class="drawer-overlay" onclick={() => (mobileOpen = false)} onkeydown={() => (mobileOpen = false)} role="presentation"></div>
	<div class="drawer" role="dialog" aria-label="Navigation menu">
		<ul class="drawer-links">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="drawer-link"
						class:active={activeHash === link.href}
						onclick={(e) => handleNavClick(e, link.href)}
					>
						<span class="nav-icon"><Icon name={link.icon} size={20} /></span>
						<span>{link.label}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="drawer-socials">
			{#each portfolio.socialLinks as social}
				<a
					href={social.url}
					class="social-link"
					target={social.platform !== 'email' ? '_blank' : undefined}
					rel={social.platform !== 'email' ? 'noopener noreferrer' : undefined}
					aria-label={social.label}
				>
					<Icon name={social.icon} size={20} />
				</a>
			{/each}
		</div>
	</div>
{/if}

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: var(--nav-width);
		height: 100vh;
		display: flex;
		flex-direction: column;
		padding: var(--space-8) var(--space-6);
	background: rgba(24, 28, 25, 0.7);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		z-index: 100;
	}

	.sidebar-brand {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		margin-bottom: var(--space-12);
	}

	.brand-text {
		font-size: var(--text-headline-name);
		font-weight: var(--text-headline-name-weight);
		line-height: var(--text-headline-name-leading);
		color: var(--on-surface);
	}

	.brand-sub {
		font-size: var(--text-body);
		font-weight: var(--text-label-weight);
		letter-spacing: var(--text-label-tracking);
		text-transform: uppercase;
		color: var(--primary);
	}

	.brand-headline {
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.5;
		color: var(--on-surface-variant);
		margin-top: var(--space-3);
		opacity: 0.7;
	}

	.nav-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		flex: 1;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) 0;
		border-radius: var(--radius-md);
		color: var(--on-surface-variant);
		text-decoration: none;
		font-size: var(--text-body);
		transition: color 0.15s ease;
	}

	.nav-link:hover {
		color: var(--on-surface);
		text-decoration: none;
	}

	.nav-link.active {
		color: var(--primary);
	}

	.nav-icon {
		display: flex;
		align-items: center;
	}

	.nav-label {
		font-weight: 400;
	}

	.sidebar-footer {
		display: flex;
		gap: var(--space-4);
		padding-top: var(--space-6);
	}

	.social-link {
		color: var(--on-surface-variant);
		transition: color 0.15s ease;
		text-decoration: none;
	}

	.social-link:hover {
		color: var(--primary);
		text-decoration: none;
	}

	.mobile-bar {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 56px;
		padding: 0 var(--space-4);
		align-items: center;
		justify-content: space-between;
		background: rgba(14, 14, 14, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		z-index: 200;
	}

	.mobile-brand {
		font-size: var(--text-title);
		font-weight: var(--text-title-weight);
		color: var(--on-surface);
	}

	.hamburger {
		background: none;
		border: none;
		color: var(--on-surface);
		cursor: pointer;
		padding: var(--space-2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.drawer-overlay {
		display: none;
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 250;
	}

	.drawer {
		display: none;
		position: fixed;
		top: 56px;
		right: 0;
		bottom: 0;
		width: 280px;
		background: var(--surface-container);
		padding: var(--space-6);
		z-index: 300;
		flex-direction: column;
		justify-content: space-between;
	}

	.drawer-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.drawer-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		color: var(--on-surface-variant);
		text-decoration: none;
		font-size: var(--text-body);
	}

	.drawer-link:hover {
		background-color: var(--surface-variant);
		color: var(--on-surface);
		text-decoration: none;
	}

	.drawer-link.active {
		color: var(--primary);
		background-color: var(--surface-container-high);
	}

	.drawer-socials {
		display: flex;
		gap: var(--space-4);
		padding-top: var(--space-6);
	}

	@media (max-width: 767px) {
		.sidebar {
			display: none;
		}

		.mobile-bar {
			display: flex;
		}

		.drawer-overlay {
			display: block;
		}

		.drawer {
			display: flex;
		}
	}
</style>
