<script lang="ts">
	import {
		GithubLogo,
		LinkedinLogo,
		At,
		ReadCvLogo,
		User,
		BuildingOffice,
		Code,
		Circuitry,
		List,
		X,
		ArrowUpRight,
		Buildings,
		PenNib,
		Camera,
		Terminal
	} from 'phosphor-svelte';
	import type { IconWeight } from 'phosphor-svelte';
	import type { Component } from 'svelte';

	interface Props {
		name: string;
		size?: number;
		weight?: IconWeight;
	}

	let { name, size = 20, weight = 'light' }: Props = $props();

	const iconMap: Record<string, Component<{ size?: number; weight?: IconWeight }>> = {
		'github-logo': GithubLogo,
		'linkedin-logo': LinkedinLogo,
		at: At,
		'read-cv-logo': ReadCvLogo,
		user: User,
		'building-office': BuildingOffice,
		code: Code,
		circuitry: Circuitry,
		list: List,
		x: X,
		'arrow-up-right': ArrowUpRight,
		buildings: Buildings,
		'pen-nib': PenNib,
		camera: Camera,
		terminal: Terminal
	};

	const Icon = $derived(iconMap[name]);
</script>

{#if Icon}
	<Icon {size} {weight} />
{/if}
