<script lang="ts">
	import { portfolio, siteUrl } from '$lib/data/portfolio';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { ArrowUpRight } from 'phosphor-svelte';
	import DogTaxLightbox from '$lib/components/DogTaxLightbox.svelte';

	const pageTitle = `${portfolio.name} — ${portfolio.title}`;
	const sameAs = portfolio.socialLinks
		.filter((l) => l.platform === 'github' || l.platform === 'linkedin')
		.map((l) => l.url);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: portfolio.name,
		jobTitle: portfolio.title,
		url: siteUrl,
		sameAs,
		description: portfolio.heroHeadline
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={portfolio.heroHeadline} />

	<link rel="canonical" href={siteUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={portfolio.heroHeadline} />
	<meta property="og:site_name" content={portfolio.name} />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={portfolio.heroHeadline} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section id="hero" class="hero">
	<h1 class="hero-name mobile-only">{portfolio.name}</h1>
	<p class="hero-title mobile-only">{portfolio.title}</p>

	<div class="hero-links mobile-only">
		{#each portfolio.socialLinks as social}
			<a
				href={social.url}
				class="ghost-button"
				target={social.platform !== 'email' ? '_blank' : undefined}
				rel={social.platform !== 'email' ? 'noopener noreferrer' : undefined}
			>
				<Icon name={social.icon} size={18} />
				<span>{social.label}</span>
			</a>
		{/each}
	</div>
</section>

<section id="about" class="about">
	<SectionHeader overline="About me" headline={portfolio.heroHeadline} />

	<div class="about-content">
		{#each portfolio.about as paragraph}
			<p class="about-text">{@html paragraph}</p>
		{/each}
		<DogTaxLightbox imageSrc="/images/sansa.webp" />
	</div>
</section>

<section id="experience" class="experience">
	<SectionHeader overline="Work Experience" headline="Where I've contributed." />

	<div class="timeline">
		{#each portfolio.experience as job}
			<article class="experience-card">
				<div class="date-range">
					{job.startYear} — {job.endYear}
				</div>
				<div class="card-body">
					<h3 class="role">{job.role}</h3>
					<p class="company"><a href={job.companyUrl} target="_blank" rel="noopener noreferrer">{job.company}</a></p>
					<p class="description">{job.description}</p>
					{#if job.highlights.length}
						<ul class="highlights">
							{#each job.highlights as highlight}
								<li>{highlight}</li>
							{/each}
						</ul>
					{/if}
					<div class="tags">
						{#each job.tags as tag}
							<Chip label={tag} />
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<section id="projects" class="projects">
	<SectionHeader overline="Personal Projects" headline="What I've built." />

	<div class="project-grid">
		{#each portfolio.projects as project}
			<article class="project-card">
				{#if project.image}
					<img
						class="project-image"
						src={project.image}
						alt="{project.title} screenshot"
						loading="lazy"
						width="600"
						height="375"
					/>
				{/if}
				<div class="project-content">
					<h3 class="project-title">
						{#if project.link}
							<a href={project.link.url} target="_blank" rel="noopener noreferrer">{project.title}</a>
						{:else}
							{project.title}
						{/if}
					</h3>
					<p class="project-description">{@html project.description}</p>

					{#if project.link}
						<a
							href={project.link.url}
							class="project-link"
							target="_blank"
							rel="noopener noreferrer"
						>
							{project.link.label}
							<ArrowUpRight size={16} weight="light" />
						</a>
					{/if}

					<div class="tags">
						{#each project.tags as tag}
							<Chip label={tag} />
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<section id="interests" class="interests">
	<SectionHeader overline="Interests" headline="Beyond the terminal." />

	<div class="interests-grid">
		{#each portfolio.interests as interest}
			<div class="interest-item">
				<span class="interest-icon"><Icon name={interest.icon} size={24} /></span>
				<div class="interest-text">
					<span class="interest-label">{interest.label}</span>
					<p class="interest-description">{interest.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.hero {
		display: none;
	}

	.hero-name {
		font-size: var(--text-display);
		font-weight: var(--text-display-weight);
		letter-spacing: var(--text-display-tracking);
		line-height: var(--text-display-leading);
		color: var(--on-surface);
		margin-bottom: var(--space-3);
	}

	.hero-title {
		font-size: var(--text-title);
		font-weight: var(--text-title-weight);
		color: var(--on-surface-variant);
		margin-bottom: var(--space-8);
	}

	.hero-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.ghost-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		color: var(--primary);
		font-size: var(--text-body);
		font-weight: 400;
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: background-color 0.15s ease;
	}

	.ghost-button:hover {
		background-color: var(--surface-variant);
		text-decoration: none;
	}

	.about {
		padding-bottom: var(--space-section);
	}

	.about-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.about-text {
		font-size: var(--text-body);
		font-weight: var(--text-body-weight);
		line-height: var(--text-body-leading);
		color: var(--on-surface-variant);
	}

	.about-text :global(a) {
		font-weight: 700;
		font-style: italic;
		text-decoration: none;
		color: inherit;
		transition: text-decoration 0.15s ease;
	}

	.about-text :global(a:hover) {
		text-decoration: underline;
	}

	.about-text :global(.dog-tax-trigger) {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		font-weight: 700;
		font-style: italic;
		color: var(--primary);
		cursor: pointer;
		text-decoration: underline dashed;
		text-decoration-color: var(--outline);
		text-underline-offset: 3px;
		transition: text-decoration-color 0.15s ease;
	}

	.about-text :global(.dog-tax-trigger:hover) {
		text-decoration: underline solid;
		text-decoration-color: var(--primary);
	}

	.experience {
		padding-bottom: var(--space-section);
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.experience-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		background-color: var(--surface-container-low);
		transition: background-color 0.15s ease;
	}

	.experience-card:hover {
		background-color: var(--surface-container-high);
	}

	.date-range {
		font-size: var(--text-label);
		font-weight: var(--text-label-weight);
		letter-spacing: var(--text-label-tracking);
		text-transform: uppercase;
		color: var(--on-surface-variant);
		padding-top: var(--space-1);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.role {
		font-size: var(--text-title);
		font-weight: var(--text-title-weight);
		color: var(--on-surface);
	}

	.company {
		font-size: var(--text-body);
		color: var(--primary);
	}

	.company a {
		color: inherit;
		text-decoration: none;
	}

	.company a:hover {
		text-decoration: underline;
	}

	.description {
		font-size: var(--text-body);
		font-weight: var(--text-body-weight);
		line-height: var(--text-body-leading);
		color: var(--on-surface-variant);
	}

	.highlights {
		list-style: disc;
		padding-left: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.highlights li {
		font-size: var(--text-body);
		font-weight: var(--text-body-weight);
		line-height: var(--text-body-leading);
		color: var(--on-surface-variant);
	}

	.highlights li::marker {
		color: var(--primary);
	}

	.projects {
		padding-bottom: var(--space-section);
	}

	.project-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.project-card {
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		background-color: var(--surface-container-low);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--space-6);
		transition: background-color 0.15s ease;
	}

	.project-card:hover {
		background-color: var(--surface-container-high);
	}

	.project-image {
		width: 40%;
		flex-shrink: 0;
		height: auto;
		border-radius: var(--radius-md);
	}

	.project-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
		min-width: 0;
	}

	.project-title {
		font-size: var(--text-title);
		font-weight: var(--text-title-weight);
		color: var(--on-surface);
	}

	.project-title a {
		color: inherit;
		text-decoration: none;
	}

	.project-title a:hover {
		text-decoration: underline;
	}

	.project-description {
		font-size: var(--text-body);
		font-weight: var(--text-body-weight);
		line-height: var(--text-body-leading);
		color: var(--on-surface-variant);
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--primary);
		font-size: var(--text-body);
		text-decoration: none;
		width: fit-content;
	}

	.project-link:hover {
		text-decoration: underline;
	}

	.interests {
		padding-bottom: var(--space-section);
	}

	.interests-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.interest-item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		background-color: var(--surface-container-low);
		transition: background-color 0.15s ease;
	}

	.interest-item:hover {
		background-color: var(--surface-container-high);
	}

	.interest-icon {
		display: flex;
		align-items: center;
		color: var(--primary);
	}

	.interest-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.interest-label {
		font-size: var(--text-body);
		font-weight: var(--text-body-weight);
		color: var(--on-surface-variant);
	}

	.interest-description {
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--on-surface-variant);
		opacity: 0.7;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-2);
	}

	.mobile-only {
		display: none;
	}

	@media (max-width: 767px) {
		.hero {
			display: block;
			padding-bottom: var(--space-16);
		}

		.mobile-only {
			display: block;
		}

		.hero-name {
			font-size: 2.5rem;
		}

		.about-content {
			padding-left: 0;
		}

		.project-card {
			flex-direction: column;
		}

		.project-image {
			width: 100%;
		}

		.interests-grid {
			gap: var(--space-6);
		}
	}
</style>
