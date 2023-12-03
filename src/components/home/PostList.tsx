'use client';

import useSWR from 'swr';

import type { SimplePost } from '../../@types/custom/post';
import GridSpinner from '../ui/GridSpinner';
import PostListCard from './PostListCard';

export default function PostList() {
	const { data: posts, isLoading } = useSWR<SimplePost[]>('api/posts');

	return (
		<section>
			{isLoading && (
				<div className="text-center mt-32">
					<GridSpinner color="red" />
				</div>
			)}
			{posts && (
				<ul className="flex flex-col gap-4">
					{posts.map((post, index) => (
						<PostListCard key={post.id} post={post} priority={index < 2} />
					))}
				</ul>
			)}
		</section>
	);
}
