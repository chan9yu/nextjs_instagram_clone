import { RiBookmarkLine } from 'react-icons/ri';

type BookmarkIconProps = {
	className?: string;
};
export default function BookmarkIcon({ className }: BookmarkIconProps) {
	return <RiBookmarkLine className={className || 'w-6 h-6'} />;
}
