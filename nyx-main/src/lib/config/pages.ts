import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-svelte';
import { site } from '$lib/config/site';

export const Home = {
	socialLinks: [
		site.socials.github && { href: site.socials.github, text: 'GitHub', icon: IconBrandGithub },
		site.socials.linkedin && {
			href: site.socials.linkedin,
			text: 'LinkedIn',
			icon: IconBrandLinkedin
		},
		site.socials.x && { href: site.socials.x, text: '', icon: IconBrandX }
	].filter(Boolean) as { href: string; text: string; icon: typeof IconBrandGithub }[]
};

export interface ExperienceTimelineItem {
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

export const experienceTimeline: ExperienceTimelineItem[] = site.experience;
