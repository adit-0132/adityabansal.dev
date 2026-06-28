import type { PageLoad } from './$types';
import { getFeaturedProjects } from '$lib/content/projects';
import { emptyCommitData } from '$lib/api/commits';

export const prerender = true;

export const load: PageLoad = async () => {
	const featuredProjects = await getFeaturedProjects();

	return {
		featuredProjects,
		commitData: emptyCommitData
	};
};
