import {
	type Icon,
	IconBrandBluesky,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX
} from '@tabler/icons-svelte';
import Wakatime from '$lib/icons/Wakatime.svelte';
import { site } from '$lib/config/site';

interface Site {
	name: string;
	url: string;
	description: string;
	tags: string[];
	seo: {
		author: string;
		birthDate: string;
		worksFor: { name: string; url: string };
		location: { city: string; region: string; country: string };
	};
	abacus: { instance: string; namespace: string; key: string };
	out: {
		github: string;
		linkedin: string;
		calcom: string;
		wakatime: string;
		bluesky: string;
		instagram: string;
		x: string;
	};
	repo: { url: string; commitBaseUrl: string };
}

const Site: Site = {
	name: site.identity.name,
	url: site.identity.url,
	description: site.identity.description,
	tags: site.identity.tags,
	seo: {
		author: site.identity.seo.author,
		birthDate: site.identity.seo.birthDate,
		worksFor: site.identity.seo.worksFor,
		location: site.identity.seo.location
	},
	abacus: {
		instance: site.brand.analytics.abacusInstance,
		namespace: site.brand.analytics.abacusNamespace,
		key: site.brand.analytics.abacusKey
	},
	out: {
		github: site.socials.github,
		linkedin: site.socials.linkedin,
		calcom: site.socials.calcom,
		wakatime: site.socials.wakatime,
		bluesky: site.socials.bluesky,
		instagram: site.socials.instagram,
		x: site.socials.x
	},
	repo: {
		url: site.brand.repoUrl,
		commitBaseUrl: site.brand.commitBaseUrl
	}
};

export default Site;

interface SocialLink {
	url: string;
	label: string;
	icon: Icon;
	footer: boolean;
}

const allSocials: SocialLink[] = [
	{ url: site.socials.github, label: 'GitHub', icon: IconBrandGithub, footer: true },
	{ url: site.socials.linkedin, label: 'LinkedIn', icon: IconBrandLinkedin, footer: true },
	{ url: site.socials.x, label: 'X', icon: IconBrandX, footer: true },
	{ url: site.socials.bluesky, label: 'Bluesky', icon: IconBrandBluesky, footer: false },
	{ url: site.socials.instagram, label: 'Instagram', icon: IconBrandInstagram, footer: true },
	{ url: site.socials.wakatime, label: 'WakaTime', icon: Wakatime as unknown as Icon, footer: false }
];

export const Socials = allSocials.filter((s) => !!s.url);
