import { NextRequest, NextResponse } from 'next/server';

import { TAB_TYPE } from '../../../../constants/user';
import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '../../../../services/post';

type Context = {
	params: {
		slug: [string, TAB_TYPE];
	};
};

export async function GET(_: NextRequest, context: Context) {
	const { slug } = context.params;

	if (!slug || !Array.isArray(slug) || slug.length < 2) {
		return new NextResponse('Bad Request', { status: 400 });
	}

	const [username, query] = slug;
	let request;

	switch (query) {
		case TAB_TYPE.POSTS:
			request = getPostsOf;
			break;
		case TAB_TYPE.SAVED:
			request = getSavedPostsOf;
			break;
		case TAB_TYPE.LIKED:
			request = getLikedPostsOf;
			break;
		default:
			new NextResponse('Bad Request', { status: 400 });
			return;
	}

	return request(username).then(data => NextResponse.json(data));
}
