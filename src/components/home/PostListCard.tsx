import Image from 'next/image';

import type { SimplePost } from '../../@types/custom/post';
import Avatar from '../ui/Avatar';
import Actionbar from './Actionbar';
import CommentForm from './CommentForm';

type PostListCardProps = {
	post: SimplePost;
	priority?: boolean;
};

export default function PostListCard({ post, priority = false }: PostListCardProps) {
	const { comments, createdAt, id, image, likes, text, userImage, username } = post;

	return (
		<article className="rounded-lg shadow-md border border-gray-200">
			<div className="flex items-center p-2">
				<Avatar image={userImage} highlight size="md" />
				<span className="text-gray-900 font-bold ml-2">{username}</span>
			</div>
			<Image
				className="w-full object-cover aspect-square"
				src={image}
				alt={`photo by ${username}`}
				width={500}
				height={500}
				priority={priority}
			/>
			<Actionbar createdAt={createdAt} likes={likes} text={text} username={username} />
			<CommentForm />
		</article>
	);
}
