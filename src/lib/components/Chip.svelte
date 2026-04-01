<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<span class="chip">{label}</span>

<style>
	.chip {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background-color: var(--surface-container-highest);
		color: var(--on-surface-variant);
		font-size: var(--text-label);
		font-weight: var(--text-label-weight);
		letter-spacing: 0.02em;
		border-radius: var(--radius-full);
		white-space: nowrap;
	}
</style>
