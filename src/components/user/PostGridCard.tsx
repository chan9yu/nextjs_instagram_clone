import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

import type { SimplePost } from '../../@types/custom/post';
import ModalPortal from '../common/ModalPortal';
import PostDetail from '../common/PostDetail';
import PostModal from '../common/PostModal';

type PostGridCardProps = {
	post: SimplePost;
	priority: boolean;
};

export default function PostGridCard({ post, priority = false }: PostGridCardProps) {
	const { image, username } = post;

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const { data: session } = useSession();

	const handleOpenPost = () => {
		if (!session?.user) {
			return signIn();
		}
		handleOpenModal();
	};

	return (
		<div className="relative w-full aspect-square">
			<Image
				className="object-cover"
				src={image}
				alt={`photo by ${username}`}
				fill
				sizes="650px"
				priority={priority}
				onClick={handleOpenPost}
			/>
			{openModal && (
				<ModalPortal>
					<PostModal onClose={handleCloseModal}>
						<PostDetail postId={post.id} />
					</PostModal>
				</ModalPortal>
			)}
		</div>
	);
}
