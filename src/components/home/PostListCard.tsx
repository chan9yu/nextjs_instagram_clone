'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { Comment, SimplePost } from '../../@types/custom/post';
import usePosts from '../../hooks/usePosts';
import ModalPortal from '../common/ModalPortal';
import PostDetail from '../common/PostDetail';
import PostModal from '../common/PostModal';
import Actionbar from './Actionbar';
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

	const { postComment } = usePosts();

	const handlePostComment = (comment: Comment) => {
		postComment(post, comment);
	};

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
			<Actionbar post={post} onComment={handlePostComment}>
				<p>
					<span className="font-bold mr-1">{username}</span>
					{text}
				</p>
				{comments > 1 && (
					<button className="font-bold my-2 text-sky-500" onClick={handleOpenModal}>
						{`View all ${comments} comments`}
					</button>
				)}
			</Actionbar>
			{openModal && (
				<ModalPortal>
					<div className="fixed top-0 left-0 w-full h-full z-[1001]">
						<PostModal onClose={handleCloseModal}>
							<PostDetail post={post} />
						</PostModal>
					</div>
				</ModalPortal>
			)}
		</article>
	);
}
