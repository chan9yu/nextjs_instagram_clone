type AvatarSize = 'sm' | 'md' | 'lg';

type AvatarProps = {
	image?: string | null;
	size?: AvatarSize;
	highlight?: boolean;
};

export default function Avatar({ highlight = false, image = null, size = 'md' }: AvatarProps) {
	return (
		<div className={getContainerStyle(size, highlight)}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				className={`bg-white object-cover rounded-full ${getImageSizeStyle(size)}`}
				src={image ?? undefined}
				alt="user profile"
				referrerPolicy="no-referrer"
			/>
		</div>
	);
}

function getContainerSize(size: AvatarSize) {
	const sizeStyle = {
		sm: 'w-9 h-9',
		md: 'w-11 h-11',
		lg: 'w-[68px] h-[68px]'
	}[size];

	return sizeStyle;
}

function getContainerStyle(size: AvatarSize, highlight: boolean) {
	const baseStyle = 'rounded-full flex justify-center items-center';
	const highlightStyle = highlight ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300' : '';
	const sizeStyle = getContainerSize(size);

	return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: AvatarSize) {
	const sizeStyle = {
		sm: 'w-[34px] h-[34px] p-[0.1rem]',
		md: 'w-[42px] h-[42px] p-[0.1rem]',
		lg: 'w-16 h-16 p-[0.2rem]'
	}[size];

	return sizeStyle;
}
