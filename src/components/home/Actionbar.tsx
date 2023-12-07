import { parasDate } from '../../utils/data';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import HeartIcon from '../ui/icons/HeartIcon';

type ActionbarProps = {
	createdAt: string;
	likes: string[] | null;
	username: string;
	text?: string;
};

export default function Actionbar({ createdAt, likes, username, text }: ActionbarProps) {
	const likeCount = likes?.length ?? 0;

	return (
		<>
			<div className="flex justify-between my-2 px-4">
				<HeartIcon />
				<BookmarkIcon />
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
