/**
 * site.ts — the ONE file you edit (or the /admin UI edits) to make this portfolio yours.
 *
 * Every developer-specific string, link, image, and experience entry lives here.
 * No component references hardcoded names anywhere else.
 *
 * After editing: `bun run dev` to preview, commit and push to deploy via GitHub Pages.
 */

export interface PetPhoto {
	url: string;
	alt: string;
}

export interface Pet {
	name: string;
	heading: string;
	photos: PetPhoto[];
}

export interface ExperienceEntry {
	company: string;
	role: string;
	url: string;
	logoUrl: string;
	logoAlt: string;
	startDate: string;
	endDate?: string;
	details?: string;
	logoScale?: number;
}

export interface NavItem {
	title: string;
	href: string;
	external?: boolean;
}

export const site = {
	identity: {
		name: 'Aditya Bansal',
		firstName: 'Aditya',
		lastName: 'Bansal',
		givenName: 'Aditya',
		familyName: 'Bansal',
		alternateNames: [] as string[],
		handle: '@adit-0132',
		url: 'https://adityabansal.dev',
		description: 'Aditya Bansal — CS student & developer. Building things on the web, the cloud, and the LLM stack.',
		jobTitle: 'Software Engineer',
		tags: [
			'Aditya Bansal',
			'Software Engineer',
			'Full Stack Developer',
			'GSoC 2026',
			'AWS',
			'LLM Apps'
		],
		seo: {
			author: 'Aditya Bansal',
			birthDate: '2005-03-29',
			worksFor: {
				name: 'R Project for Statistical Computing (GSoC)',
				url: 'https://www.r-project.org/'
			},
			location: {
				city: 'New Delhi',
				region: 'Delhi',
				country: 'India'
			},
			geoRegion: 'IN-DL',
			knowsAbout: [
				'Software Engineering',
				'Web Development',
				'Python',
				'Java',
				'FastAPI',
				'AWS',
				'Docker',
				'LLM Applications',
				'RAG',
				'GitHub Actions'
			] as string[]
		}
	},
	hero: {
		greeting: "Hey! I'm",
		easterEggParens: null as string | null,
		bio: "A CS student at JIIT & IIT Madras, currently a GSoC '26 contributor at the R Project. I build with Python, FastAPI, and just enough JavaScript to ship."
	},
	about: {
		pageTitle: 'About Me',
		heading: 'About Me',
		avatarUrl: '/images/placeholder-avatar.svg',
		avatarAlt: 'Aditya Bansal',
		intro: "Hey, I'm Aditya — a software engineer in the middle of a dual degree (Integrated MTech at JIIT Noida, BS in Data Science at IIT Madras).",
		paragraphs: [
			"Right now I'm a Google Summer of Code 2026 contributor on the R Project, building an R package that section-translates help pages via a utils:::.getHelpFile() shim. Before that I spent time at Logit as an AWS Cloud Intern, putting EC2/S3/IAM stacks into production and tuning costs at rollout.",
			"I like building things end-to-end — recent work spans a multimodal RAG system for IIT Madras course data, a GitHub App that audits CI/CD workflows for security risks, and a Chrome extension that migrates conversations between ChatGPT and Claude. I'm AWS-certified (Cloud Practitioner + AI Practitioner) and most comfortable in Python, but happy in Java, R, or whatever the job needs.",
			"Outside of code: cinema enthusiast, survival-gaming fan, and occasionally sporty."
		],
		hobbiesText: 'Always happy to chat — reach out if you want to talk LLMs, infra, or interesting builds.',
		showEmailButton: true,
		pet: null as Pet | null
	},
	pics: {
		pageTitle: 'Pics',
		heading: 'pics',
		description: 'A collection of photos.'
	},
	socials: {
		github: 'https://github.com/adit-0132',
		linkedin: 'https://linkedin.com/in/aditya-bansal-jiit',
		x: '',
		bluesky: '',
		instagram: '',
		wakatime: '',
		calcom: ''
	},
	experience: [
		{
			company: 'R Project for Statistical Computing',
			role: 'Google Summer of Code Developer',
			url: 'https://www.r-project.org/',
			logoUrl: '/logos/r-project.svg',
			logoAlt: 'R Project logo',
			startDate: '2026-05',
			details:
				'Building an R package that section-translates help pages via a utils:::.getHelpFile() shim, supporting static, install-dynamic, and render-dynamic Rd macro content.'
		},
		{
			company: 'Logit',
			role: 'AWS Cloud Intern',
			url: 'https://logit.co.in',
			logoUrl: '/logos/logit.png',
			logoAlt: 'Logit logo',
			startDate: '2025-01',
			endDate: '2025-07',
			details:
				'Designed and deployed core AWS stack (EC2, S3, IAM) for production. Enabled scalable workloads via EC2 auto-scaling and optimized baseline infra costs at rollout.'
		}
	] as ExperienceEntry[],
	nav: {
		main: [
			{ title: 'About', href: '/about' },
			{ title: 'Projects', href: '/projects' },
			{ title: 'Pics', href: '/pics' }
		] as NavItem[],
		more: [
			{ title: 'Socials', href: '/socials' }
		] as NavItem[]
	},
	brand: {
		copyrightName: 'Aditya Bansal',
		repoUrl: 'https://github.com/adit-0132/adityabansal.dev',
		commitBaseUrl: 'https://github.com/adit-0132/adityabansal.dev/commit/',
		analytics: {
			enabled: false,
			abacusInstance: '',
			abacusNamespace: '',
			abacusKey: ''
		},
		contactEmail: 'aditya2017rks@gmail.com'
	}
};

export type SiteConfig = typeof site;
