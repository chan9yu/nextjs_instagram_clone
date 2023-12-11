type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = {
	image?: string | null;
	size?: AvatarSize;
	highlight?: boolean;
};

type ImageSizeStyle = {
	container: string;
	image: string;
};

export default function Avatar({ highlight = false, image = null, size = 'md' }: AvatarProps) {
	return (
		<div className={getContainerStyle(size, highlight)}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				className={`bg-white object-cover rounded-full ${getImageSizeStyle(size).image}`}
				src={image ?? undefined}
				alt="user profile"
				referrerPolicy="no-referrer"
			/>
		</div>
	);
}

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
	const sizeStyle = {
		sm: {
			container: 'w-9 h-9',
			image: 'w-[34px] h-[34px] p-[0.1rem]'
		},
		md: {
			container: 'w-11 h-11',
			image: 'w-[42px] h-[42px] p-[0.1rem]'
		},
		lg: {
			container: 'w-[68px] h-[68px]',
			image: 'w-16 h-16 p-[0.2rem]'
		},
		xl: {
			container: 'w-[142px] h-[142px]',
			image: 'w-[138px] h-[138px] p-[0.3rem]'
		}
	} as { [key: string]: ImageSizeStyle };

	return sizeStyle[size];
}

function getContainerStyle(size: AvatarSize, highlight: boolean) {
	const baseStyle = 'rounded-full flex justify-center items-center';
	const highlightStyle = highlight ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300' : '';
	const { container } = getImageSizeStyle(size);

	return `${baseStyle} ${highlightStyle} ${container}`;
}
