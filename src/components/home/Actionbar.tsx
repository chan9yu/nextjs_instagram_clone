import type { ChildrenProps } from '../../@types/common';
import type { Comment, SimplePost } from '../../@types/custom/post';
import useMe from '../../hooks/useMe';
import usePosts from '../../hooks/usePosts';
import { parasDate } from '../../utils/data';
import ToggleButton from '../ui/ToggleButton';
import BookmarkFillIcon from '../ui/icons/BookmarkFillIcon';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import HeartFillIcon from '../ui/icons/HeartFillIcon';
import HeartIcon from '../ui/icons/HeartIcon';
import CommentForm from './CommentForm';

type ActionbarProps = ChildrenProps & {
	onComment: (comment: Comment) => void;
	post: SimplePost;
};

export default function Actionbar({ onComment, post, children }: ActionbarProps) {
	const { createdAt, id, likes } = post;

	const { user, setBookmark } = useMe();
	const { setLike } = usePosts();

	const handleLike = (like: boolean) => {
		user && setLike(post, user.username, like);
	};

	const handleBookmark = (bookmark: boolean) => {
		user && setBookmark(id, bookmark);
	};

	const handleComment = (comment: string) => {
		user && onComment({ comment, username: user.username, image: user.image });
	};

	const bookmarked = user?.bookmarks.includes(id) ?? false;
	const liked = user ? likes?.includes(user.username) : false;
	const likeCount = likes?.length ?? 0;

	return (
		<>
			<div className="flex justify-between my-2 px-4">
				<ToggleButton //
					offIcon={<HeartIcon />}
					onIcon={<HeartFillIcon />}
					onToggle={handleLike}
					toggled={liked}
				/>
				<ToggleButton
					offIcon={<BookmarkIcon />}
					onIcon={<BookmarkFillIcon />}
					onToggle={handleBookmark}
					toggled={bookmarked}
				/>
			</div>
			<div className="px-4 py-1">
				<p className="text-sm font-bold mb-2">{`${likeCount} ${likeCount > 1 ? 'likes' : 'like'}`}</p>
				{children}
				<p className="text-xs text-neutral-500 uppercase my-2">{parasDate(createdAt)}</p>
			</div>
			<CommentForm onPostComment={handleComment} />
		</>
	);
}
