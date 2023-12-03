import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { addUser } from '../../../../services/user';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_OAUTH_ID,
			clientSecret: process.env.GOOGLE_OAUTH_SECRET
		})
	],
	callbacks: {
		async signIn({ user: { id, email, image, name } }) {
			if (!email) {
				return false;
			}

			addUser({
				id,
				email,
				image,
				name: name || '',
				username: email.split('@')[0]
			});

			return true;
		},
		async session({ session }) {
			const user = session?.user;
			if (user) {
				session.user = {
					...user,
					username: user.email?.split('@')[0] || ''
				};
			}

			return session;
		}
	},
	pages: {
		signIn: '/auth/signin'
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
