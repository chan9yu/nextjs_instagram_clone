import { useSession } from 'next-auth/react';
import { useState } from 'react';

import type { SimplePost } from '../../@types/custom/post';
import usePosts from '../../hooks/usePosts';
import { parasDate } from '../../utils/data';
import ToggleButton from '../ui/ToggleButton';
import BookmarkFillIcon from '../ui/icons/BookmarkFillIcon';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import HeartFillIcon from '../ui/icons/HeartFillIcon';
import HeartIcon from '../ui/icons/HeartIcon';

type ActionbarProps = {
	post: SimplePost;
};

export default function Actionbar({ post }: ActionbarProps) {
	const { createdAt, likes, text, username } = post;

	const { data: session } = useSession();
	const user = session?.user;
	const liked = user ? likes?.includes(user.username) : false;
	const likeCount = likes?.length ?? 0;

	const [bookmarked, setBookmarked] = useState(false);

	const { setLike } = usePosts();

	const handleLike = (like: boolean) => {
		user && setLike(post, user.username, like);
	};

	const handleBookmark = (bookmark: boolean) => {
		setBookmarked(bookmark);
	};

	return (
		<>
			<div className="flex justify-between my-2 px-4">
				<ToggleButton offIcon={<HeartIcon />} onIcon={<HeartFillIcon />} onToggle={handleLike} toggled={liked} />
				<ToggleButton
					offIcon={<BookmarkIcon />}
					onIcon={<BookmarkFillIcon />}
					onToggle={handleBookmark}
					toggled={bookmarked}
				/>
			</div>
			<div className="px-4 py-1">
				<p className="text-sm font-bold mb-2">{`${likeCount} ${likeCount > 1 ? 'likes' : 'like'}`}</p>
				{text && (
					<p>
						<span className="font-bold mr-1">{username}</span>
						{text}
					</p>
				)}
				<p className="text-xs text-neutral-500 uppercase my-2">{parasDate(createdAt)}</p>
			</div>
		</>
	);
}
