import Link from 'next/link';

import type { ProfileUser } from '../../@types/custom/user';
import Avatar from '../ui/Avatar';

type UserCardProps = {
	user: ProfileUser;
};

export default function UserCard({ user: { email, followers, following, name, username, image } }: UserCardProps) {
	return (
		<Link
			className="flex items-center gap-2 w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
			href={`/user/${username}`}
		>
			<Avatar image={image} size="lg" />
			<div className="text-neutral-500">
				<p className="text-black font-bold leading-4">{username}</p>
				<p>{name}</p>
				<p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
			</div>
		</Link>
	);
}
