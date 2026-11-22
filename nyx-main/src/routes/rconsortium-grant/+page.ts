import { dev } from '$app/environment';

// static content — no client JS needed in prod, load it in dev for HMR
export const csr = dev;
export const prerender = true;

// The root layout turns this into the page's description and link-preview tags
export const load = () => ({
	metadata: {
		title: 'babelrd: an R Consortium grant',
		description:
			"The R Consortium's Infrastructure Steering Committee funded babelrd, my package for machine-drafted, human-reviewed translations of R help pages, in its second grant cycle of 2026."
	}
});
