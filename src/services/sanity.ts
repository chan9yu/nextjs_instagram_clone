import { createClient } from '@sanity/client';

export const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	useCdn: false,
	apiVersion: '2023-12-03',
	token: process.env.SANITY_SECRCT_TOKEN
});