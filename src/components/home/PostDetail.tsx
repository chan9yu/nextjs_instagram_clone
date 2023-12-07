import Image from 'next/image';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';

import type { FullPost } from '../../@types/custom/post';
import Avatar from '../ui/Avatar';
import Actionbar from './Actionbar';
import CommentForm from './CommentForm';
import PostUserAvatar from './PostUserAvatar';

type PostDetailProps = {
	postId: string;
};

export default function PostDetail({ postId }: PostDetailProps) {
	const { data, isLoading } = useSWR<FullPost>(`/api/posts/${postId}`);

	if (isLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<GridLoader color="red" size={8} />
			</div>
		);
	}

	if (!data) {
		return null;
	}

	const { comments, createdAt, image, likes, text, userImage, username } = data;

	return (
		<section className="flex w-full h-full">
			<div className="relative basis-3/5">
				<Image className="object-cover" src={image} alt={`photo by ${username}`} priority fill sizes="650px" />
			</div>
			<div className="w-full basis-2/5 flex flex-col">
				<PostUserAvatar userImage={userImage} username={username} />
				<ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
					{comments &&
						comments.map(({ comment, image, username: commentUsername }, index) => (
							<li key={index} className="flex items-center mb-1">
								<Avatar image={image} size="sm" highlight={commentUsername === username} />
								<div className="ml-2">
									<span className="font-bold mr-1">{commentUsername}</span>
									<span>{comment}</span>
								</div>
							</li>
						))}
				</ul>
				<Actionbar likes={likes} username={username} createdAt={createdAt} />
				<CommentForm />
			</div>
		</section>
	);
}
