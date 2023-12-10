import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { getUserByUsername } from '../../../services/user';
import { authOptions } from '../../../utils/auth';

export async function GET() {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	if (!user) {
		return new Response('Authentication Error', { status: 401 });
	}

	return getUserByUsername(user.username).then(data => NextResponse.json(data));
}
