import { useCallback } from 'react';
import useSWR from 'swr';

import type { HomeUser } from '../@types/custom/user';

async function updateBookmark(postId: string, bookmark: boolean) {
	const body = JSON.stringify({ id: postId, bookmark });
	const res = await fetch('/api/bookmarks', { method: 'PUT', body });
	const data = res.json();

	return data;
}

async function updateFollow(targetId: string, follow: boolean) {
	const body = JSON.stringify({ id: targetId, follow });
	const res = await fetch('/api/follow', { method: 'PUT', body });
	const data = res.json();

	return data;
}

export default function useMe() {
	const { data: user, error, isLoading, mutate } = useSWR<HomeUser>('/api/me');

	const setBookmark = useCallback(
		(postId: string, bookmark: boolean) => {
			if (!user) return;

			const bookmarks = user.bookmarks;
			const newUser = {
				...user,
				bookmarks: bookmark ? [...bookmarks, postId] : bookmarks.filter(b => b !== postId)
			};

			return mutate(updateBookmark(postId, bookmark), {
				optimisticData: newUser,
				populateCache: false,
				revalidate: false,
				rollbackOnError: true
			});
		},
		[mutate, user]
	);

	const toggleFollow = useCallback(
		(targetId: string, follow: boolean) => {
			return mutate(updateFollow(targetId, follow), {
				populateCache: false
			});
		},
		[mutate]
	);

	return {
		user,
		error,
		isLoading,
		setBookmark,
		toggleFollow
	};
}
