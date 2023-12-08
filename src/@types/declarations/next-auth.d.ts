import type { AuthUser } from '../custom/user';

declare module 'next-auth' {
	interface Session {
		user: AuthUser;
	}
}
