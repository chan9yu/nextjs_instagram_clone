import type { User } from '../custom/user';

declare module 'next-auth' {
	interface Session {
		user: User;
	}
}
