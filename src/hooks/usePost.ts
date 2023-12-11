import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import type { Comment, FullPost } from '../@types/custom/post';

async function addComment(id: string, comment: string) {
	const body = JSON.stringify({ id, comment });
	const res = await fetch('/api/comments', { method: 'POST', body });
	const data = res.json();

	return data;
}

export default function usePost(postId: string) {
	const { data: post, error, isLoading, mutate } = useSWR<FullPost>(`/api/posts/${postId}`);
	const { mutate: globalMutate } = useSWRConfig();

	const postComment = useCallback(
		(comment: Comment) => {
			if (!post) {
				return;
			}

			const newPost = {
				...post,
				comments: [...post.comments, comment]
			};

			return mutate(addComment(post.id, comment.comment), {
				optimisticData: newPost,
				populateCache: false,
				revalidate: false,
				rollbackOnError: true
			}).then(() => globalMutate('/api/posts'));
		},
		[globalMutate, mutate, post]
	);

	return {
		post,
		error,
		isLoading,
		postComment
	};
}
