import { getServerSession } from 'next-auth';

import type { AuthUser } from '../@types/custom/user';
import { authOptions } from './auth';

type Handler = (user: AuthUser) => Promise<Response>;

export async function withSessionUser(handler: Handler): Promise<Response> {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	if (!user) {
		return new Response('Authentication Error', { status: 401 });
	}

	return handler(user);
}
