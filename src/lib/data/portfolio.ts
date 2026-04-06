export interface SocialLink {
	platform: 'github' | 'linkedin' | 'email' | 'resume';
	url: string;
	label: string;
	icon: string; 
}

export interface Experience {
	company: string;
	companyUrl: string;
	role: string;
	startYear: string;
	endYear: string;
	description: string;
	highlights: string[];
	tags: string[];
}

export interface Project {
	title: string;
	description: string;
	tags: string[];
	image?: string;
	link?: {
		url: string;
		label: string;
	};
}

export interface Interest {
	icon: string; 
	label: string;
	description: string;
}

export interface PortfolioData {
	name: string;
	title: string;
	tagline: string;
	heroHeadline: string;
	about: string[];
	socialLinks: SocialLink[];
	experience: Experience[];
	projects: Project[];
	interests: Interest[];
	footer: {
		copyright: string;
		tagline: string;
	};
}

export const siteUrl = 'https://waleedalvi.com';

export const portfolio: PortfolioData = {
	name: 'Waleed Alvi',
	title: 'Software Engineer',
	tagline: '',
	heroHeadline: 'Full-stack engineer with an eye for the details that matter.',

	about: [
		"I'm a Full Stack Engineer who believes good code should be as easy to maintain as it is to ship. With 9 years of professional experience working across the .NET ecosystem and various frontend frameworks, I've had plenty of opportunities to put that into practice.",
		"Currently at <a href='https://yangaroo.com' target='_blank' rel='noopener noreferrer'>Yangaroo</a>, I manage and develop their Advertisement and Music Delivery platforms. I've implemented features such as an Analytics tool to track ad reach across key data points like demographics and region, and led the modernization of legacy frontend code using React and TypeScript. I also mentor interns and junior developers, providing code reviews and demonstrating best practices for writing clean, maintainable code.",
		"Outside of work, I've built and launched <a href='https://artfindertcg.com' target='_blank' rel='noopener noreferrer'>ArtFinderTCG</a>, powered by AI and semantic search to find Pokémon cards by describing their artwork. It started as a personal itch — I collect Pokémon cards — and turned into something other collectors genuinely find useful. I also run my own smart home using <a href='https://home-assistant.io' target='_blank' rel='noopener noreferrer'>Home Assistant</a>. It's fun automating redundant tasks around the house, but it sure does feel like a full-time job at times. Outside of the screen, I love to spend quality time with my wife and my beagle, Sansa."
	],

	socialLinks: [
		{
			platform: 'github',
			url: 'https://github.com/WaleedAlvi',
			label: 'GitHub',
			icon: 'github-logo'
		},
		{
			platform: 'linkedin',
			url: 'https://linkedin.com/in/waleedalvi',
			label: 'LinkedIn',
			icon: 'linkedin-logo'
		},
		{
			platform: 'email',
			url: 'mailto:waleed.a16@gmail.com',
			label: 'Email',
			icon: 'at'
		},
		{
			platform: 'resume',
			url: '/resume.pdf',
			label: 'Resume',
			icon: 'read-cv-logo'
		}
	],

	experience: [
		{
			company: 'Yangaroo',
			companyUrl: 'https://yangaroo.com',
			role: 'Fullstack Software Engineer',
			startYear: '2021',
			endYear: 'PRESENT',
			description:
				'Working as a core member of the Advertisement and Music Delivery platform, I collaborate with product managers and QA to implement and ship new features and improve code quality.',
			highlights: [
				'Designed and built a scalable analytics feature to track various data points based on the ad aired date. This is a key selling tool for the sales team and was utilized to acquire a competitor.',
				'Implemented an end-to-end Traffic workflow for managing advertisement instructions across distribution destinations, improving delivery reliability for the platform.',
				'Modernized legacy frontend to React/TypeScript, improving the developer experience and enabling a cleaner path to future migrations.',
				'Built and actively maintain a shared component library establishing a consistent design language across all new features and migrations.'
			],
			tags: ['.NET', 'C#', 'React', 'TypeScript', 'SQL Server']
		},
		{
			company: 'Coyote Software Corporation',
			companyUrl: 'https://www.coyotecorp.com/',
			role: 'Fullstack Software Engineer',
			startYear: '2019',
			endYear: '2021',
			description:
				"Developed and maintained CaseWorks, one of Canada's largest case management systems, collaborating with developers and QA in an agile environment.",
			highlights: [
				"Implemented a Volunteer Driver System to coordinate driver assignments and participant pickups across multiple locations.",
				"Designed and maintained SQL Server database architecture including stored procedures, views, and tables, while building internal ASP.NET APIs to expose data across the application.",
				"Contributed to a frontend modernization effort, migrating legacy ASPX pages to TypeScript components.",
			],
			tags: ['C#', 'Backbone JS', 'TypeScript', 'SQL Server']
		},
        {
			company: 'Matrix Industrial Control Systems',
			companyUrl: 'https://matrixcontrols.com/',
			role: 'Systems Analyst',
			startYear: '2017',
			endYear: '2019',
			description:
				'Built and delivered client-facing desktop applications using VB.NET and .NET, working closely with end-users and project managers to translate requirements into production software.',
			highlights: [
				"Built a reusable WPF component library — including keypads, calendars, and progress indicators — adopted as the UI foundation across internal tooling, ensuring consistency in appearance and behaviour.",
				"Collaborated with stakeholders to deliver an automated labelling application integrated into the company's modular platform, applying the MVVM pattern to cleanly separate business logic from the UI layer.",
				"Designed and developed a data collection application for a large-scale food processing company, integrating third-party APIs to fetch ingredient data and persist it to a SQL Server database with precise calculation logic.",
			],
			tags: ['.NET','VB.NET', 'C#', 'XAML', 'WinForms', 'SQL Server']
		}
	],

	projects: [
		{
			title: 'ArtFinderTCG',
			description:
				'Smart Search for Pokémon Cards. Find cards by describing their artwork, powered by AI and semantic search. Pokémon cards are not searchable by artwork using traditional methods, which was one of the main driving forces behind this project.<br><br>A background service, designed using an onion architecture and SOLID principles, processes each card through a vision model to get a detailed description, which is then stored as embeddings. This allows the app to match your words to the feeling and vibe of a card. ArtFinderTCG is live and is actively used by collectors.',
			tags: ['.NET','C#', 'React', 'TypeScript', 'Supabase', 'Pinecone', 'Google Gemini'],
			image: '/images/projects/artfindertcg.webp',
			link: { url: 'https://artfindertcg.com', label: 'Explore' }
		},
        {
			title: 'Insurance Point',
			description:
				'A responsive landing page for an insurance broker, featuring a contact form for potential client inquiries, service highlights, and testimonials from past clients.',
			tags: ['HTML', 'SASS', 'JavaScript'],
			image: '/images/projects/insurancepoint.webp',
			link: { url: 'https://insurancepoint.ca', label: 'Explore' }
		},
	],

	interests: [
		{
			icon: 'cards',
			label: 'Pokémon TCG',
			description: 'I collect and play the Pokémon TCG — which is also what led me to build ArtFinderTCG.'
		},
		{
			icon: 'house',
			label: 'Home Lab',
			description: 'I run a self-hosted stack at home — Proxmox, Home Assistant, Frigate NVR with a Coral TPU, Jellyfin, Pi-hole. It feels like a full-time job.'
		},
		{
			icon: 'paw-print',
			label: 'Sansa',
			description: 'My beagle. She has strong opinions about when I should stop coding for the day.'
		},
		{
			icon: 'soccer-ball',
			label: 'Sports',
			description: 'Big fan of soccer and basketball — always keeping up with matches, with my teams being AC Milan and The Toronto Raptors.'
		},
	],

	footer: {
		copyright: `© ${new Date().getFullYear()} Waleed Alvi`,
		tagline: 'Built with SvelteKit, designed with Google Stitch'
	}
};
