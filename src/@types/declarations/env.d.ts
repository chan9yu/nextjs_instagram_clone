declare namespace NodeJS {
	export interface ProcessEnv {
		GOOGLE_OAUTH_ID: string;
		GOOGLE_OAUTH_SECRET: string;

		NEXTAUTH_URL: string;
		NEXTAUTH_SECRET: string;

		SANITY_PROJECT_ID: string;
		SANITY_DATASET: string;
		SANITY_SECRET_TOKEN: string;
	}
}
