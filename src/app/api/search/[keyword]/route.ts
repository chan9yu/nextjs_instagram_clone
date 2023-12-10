import { NextRequest, NextResponse } from 'next/server';
import { searchUsers } from '../../../../services/user';

type Context = {
	params: { keyword: string };
};

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest, context: Context) {
	return searchUsers(context.params.keyword).then(data => NextResponse.json(data));
}
