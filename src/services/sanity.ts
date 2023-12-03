import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	useCdn: false,
	apiVersion: '2023-12-03',
	token: process.env.SANITY_SECRCT_TOKEN
});

const bulder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return bulder.image(source).width(800).url();
}
