import { dev } from '$app/environment';

// static content — no client JS needed in prod, load it in dev for HMR
export const csr = dev;
export const prerender = true;
