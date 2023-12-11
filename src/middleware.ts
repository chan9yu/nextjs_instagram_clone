import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const token = await getToken({ req });

	if (!token) {
		if (req.nextUrl.pathname.startsWith('/api')) {
			// 로그인한 사용자의 정보가 없는 상태에서 /api 접근 시
			return new NextResponse('Authentication Error', { status: 401 });
		}

		const { pathname, search, origin, basePath } = req.nextUrl;
		const signInUrl = new URL(`${basePath}/auth/signin`, origin);
		signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`);
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

export const config = {
	// middleware 적용할 path list
	matcher: ['/', '/new', '/api/bookmarks', '/api/comments', '/api/follow', '/api/likes', '/api/me', '/api/posts/:path*']
};
