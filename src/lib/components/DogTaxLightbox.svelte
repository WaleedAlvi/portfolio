<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		imageSrc: string;
		imageAlt?: string;
		containerSelector?: string;
	}

	let { imageSrc, imageAlt = 'Sansa the beagle', containerSelector = '.about-content' }: Props =
		$props();

	let isOpen = $state(false);
	let tooltipVisible = $state(false);
	let tooltipX = $state(0);
	let tooltipY = $state(0);

	function openLightbox() {
		isOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		isOpen = false;
		document.body.style.overflow = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			closeLightbox();
		}
	}

	function positionTooltip(trigger: HTMLElement) {
		const rect = trigger.getBoundingClientRect();
		tooltipX = rect.left + rect.width / 2;
		tooltipY = rect.top;
	}

	$effect(() => {
		const container = document.querySelector(containerSelector);
		if (!container) return;

		function onMouseEnter(e: Event) {
			const target = e.target as HTMLElement;
			if (target.matches('[data-dog-tax]')) {
				positionTooltip(target);
				tooltipVisible = true;
			}
		}

		function onMouseLeave(e: Event) {
			const target = e.target as HTMLElement;
			if (target.matches('[data-dog-tax]')) {
				tooltipVisible = false;
			}
		}

		function onClick(e: Event) {
			const target = e.target as HTMLElement;
			if (target.matches('[data-dog-tax]')) {
				tooltipVisible = false;
				openLightbox();
			}
		}

		container.addEventListener('mouseenter', onMouseEnter, true);
		container.addEventListener('mouseleave', onMouseLeave, true);
		container.addEventListener('click', onClick, true);

		return () => {
			container.removeEventListener('mouseenter', onMouseEnter, true);
			container.removeEventListener('mouseleave', onMouseLeave, true);
			container.removeEventListener('click', onClick, true);
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if tooltipVisible}
	<div
		class="dog-tax-tooltip"
		style="left: {tooltipX}px; top: {tooltipY}px;"
		role="tooltip"
	>
		<Icon name="paw-print" size={18} weight="fill" />
		<span>dog tax</span>
	</div>
{/if}

{#if isOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox-overlay" onclick={closeLightbox} onkeydown={handleKeydown}>
		<button class="lightbox-close" onclick={closeLightbox} aria-label="Close photo">
			<Icon name="x" size={24} weight="bold" />
		</button>

		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<img
			class="lightbox-image"
			src={imageSrc}
			alt={imageAlt}
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		/>
	</div>
{/if}

<style>
	.dog-tax-tooltip {
		position: fixed;
		transform: translate(-50%, -100%) translateY(-10px);
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		background-color: var(--surface-bright);
		color: var(--primary);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-lg);
		border: 1px solid var(--outline-variant);
		box-shadow: var(--shadow-float);
		white-space: nowrap;
		pointer-events: none;
		z-index: 100;
		animation: tooltip-in 0.15s ease forwards;
	}

	@keyframes tooltip-in {
		from {
			opacity: 0;
			transform: translate(-50%, -100%) translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -100%) translateY(-10px);
		}
	}

	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		animation: overlay-in 0.2s ease forwards;
		cursor: pointer;
	}

	@keyframes overlay-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.lightbox-close {
		position: absolute;
		top: var(--space-6);
		right: var(--space-6);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: var(--radius-full);
		background-color: var(--surface-container-highest);
		color: var(--on-surface);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.lightbox-close:hover {
		background-color: var(--surface-bright);
	}

	.lightbox-image {
		max-width: min(90vw, 500px);
		max-height: 80vh;
		object-fit: contain;
		border-radius: var(--radius-lg);
		cursor: default;
		animation: image-in 0.25s ease forwards;
	}

	@keyframes image-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
