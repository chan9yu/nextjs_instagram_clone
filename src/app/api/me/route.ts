import { NextResponse } from 'next/server';

import { getUserByUsername } from '../../../services/user';
import { withSessionUser } from '../../../utils/session';

export async function GET() {
	return withSessionUser(async user => getUserByUsername(user.username).then(data => NextResponse.json(data)));
}
