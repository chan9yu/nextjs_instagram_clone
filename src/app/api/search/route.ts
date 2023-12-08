import { NextRequest, NextResponse } from 'next/server';
import { searchUsers } from '../../../services/user';

export async function GET(_: NextRequest) {
	return searchUsers().then(data => NextResponse.json(data));
}
