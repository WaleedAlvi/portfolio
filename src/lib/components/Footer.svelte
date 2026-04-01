<script lang="ts">
	import { portfolio } from '$lib/data/portfolio';
</script>

<footer class="footer">
	<p class="copyright">{portfolio.footer.copyright}</p>
	<p class="tagline">{portfolio.footer.tagline}</p>
</footer>

<style>
	.footer {
		padding: var(--space-8) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.copyright {
		font-size: var(--text-label);
		font-weight: var(--text-label-weight);
		letter-spacing: var(--text-label-tracking);
		text-transform: uppercase;
		color: var(--on-surface-variant);
	}

	.tagline {
		font-size: var(--text-body);
		color: var(--outline);
	}
</style>
