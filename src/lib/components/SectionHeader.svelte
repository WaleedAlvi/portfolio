<script lang="ts">
	let { overline, headline }: { overline: string; headline: string } = $props();
</script>

<header class="section-header">
	<p class="overline">{overline}</p>
	<h2 class="headline">{headline}</h2>
</header>

<style>
	.section-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-12);
	}

	.overline {
		font-size: var(--text-label);
		font-weight: var(--text-label-weight);
		letter-spacing: var(--text-label-tracking);
		text-transform: uppercase;
		color: var(--primary);
	}

	.headline {
		font-size: var(--text-headline);
		font-weight: var(--text-headline-weight);
		line-height: var(--text-headline-leading);
		color: var(--on-surface);
	}
</style>
