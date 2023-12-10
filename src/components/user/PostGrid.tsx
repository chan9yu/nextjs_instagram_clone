import useSWR from 'swr';

import type { SimplePost } from '../../@types/custom/post';
import { TAB_TYPE } from '../../constants/user';
import GridSpinner from '../ui/GridSpinner';
import PostGridCard from './PostGridCard';

type PostGridProps = {
	tab: TAB_TYPE;
	username: string;
};

export default function PostGrid({ tab, username }: PostGridProps) {
	const { data: posts, error, isLoading } = useSWR<SimplePost[]>(`/api/users/${username}/${tab}`);

	return (
		<div className="w-full text-center">
			{isLoading && <GridSpinner />}
			<ul className="grid grid-cols-3 gap-4 py-4 px-8">
				{posts &&
					posts.map((post, index) => (
						<li key={post.id}>
							<PostGridCard post={post} priority={index < 6} />
						</li>
					))}
			</ul>
		</div>
	);
}
