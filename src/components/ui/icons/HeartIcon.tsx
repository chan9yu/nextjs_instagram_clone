import { AiOutlineHeart } from 'react-icons/ai';

type HeartIconProps = {
	className?: string;
};

export default function HeartIcon({ className }: HeartIconProps) {
	return <AiOutlineHeart className={className || 'w-7 h-7'} />;
}
