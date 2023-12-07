import Avatar from '../ui/Avatar';

type PostUserAvatarProps = {
	userImage: string;
	username: string;
};

export default function PostUserAvatar({ userImage, username }: PostUserAvatarProps) {
	return (
		<div className="flex items-center p-2">
			<Avatar image={userImage} highlight size="md" />
			<span className="text-gray-900 font-bold ml-2">{username}</span>
		</div>
	);
}
