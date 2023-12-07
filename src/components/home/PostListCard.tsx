'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { SimplePost } from '../../@types/custom/post';
import ModalPortal from '../common/ModalPortal';
import Actionbar from './Actionbar';
import CommentForm from './CommentForm';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import PostUserAvatar from './PostUserAvatar';

type PostListCardProps = {
	post: SimplePost;
	priority?: boolean;
};

export default function PostListCard({ post, priority = false }: PostListCardProps) {
	const { comments, createdAt, id, image, likes, text, userImage, username } = post;

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	return (
		<article className="rounded-lg shadow-md border border-gray-200">
			<PostUserAvatar userImage={userImage} username={username} />
			<Image
				className="w-full object-cover aspect-square"
				src={image}
				alt={`photo by ${username}`}
				width={500}
				height={500}
				priority={priority}
				onClick={handleOpenModal}
			/>
			<Actionbar createdAt={createdAt} likes={likes} text={text} username={username} />
			<CommentForm />
			{openModal && (
				<ModalPortal>
					<div className="fixed top-0 left-0 w-full h-full z-[1001]">
						<PostModal onClose={handleCloseModal}>
							<PostDetail postId={post.id} />
						</PostModal>
					</div>
				</ModalPortal>
			)}
		</article>
	);
}
