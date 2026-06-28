import type { Icon } from '@tabler/icons-svelte';
import { site } from '$lib/config/site';

interface NavItem {
	title: string;
	href: string;
	icon?: Icon;
	external?: boolean;
}

export const mainNavItems: NavItem[] = site.nav.main;
export const moreNavItems: NavItem[] = site.nav.more;
