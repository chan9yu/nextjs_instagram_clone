import useSWR from 'swr';
import type { SimplePost } from '../@types/custom/post';

async function updateLike(id: string, like: boolean) {
	const body = JSON.stringify({ id, like });
	const res = await fetch('/api/likes', { method: 'PUT', body });
	const data = res.json();

	return data;
}

export default function usePosts() {
	const { data: posts, error, isLoading, mutate } = useSWR<SimplePost[]>('/api/posts');

	const setLike = (post: SimplePost, username: string, like: boolean) => {
		const newPost = {
			...post,
			likes: like ? [...post.likes, username] : post.likes.filter(item => item !== username)
		};

		const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

		return mutate(updateLike(post.id, like), {
			optimisticData: newPosts,
			populateCache: false,
			revalidate: false,
			rollbackOnError: true
		});
	};

	return {
		posts,
		error,
		isLoading,
		setLike
	};
}
