'use client';

import type { ChildrenProps } from '../../@types/common';
import type { ProfileUser } from '../../@types/custom/user';
import useMe from '../../hooks/useMe';
import Button from '../ui/Button';

type FollowButtonProps = ChildrenProps & {
	user: ProfileUser;
};

export default function FollowButton({ user: { username }, children }: FollowButtonProps) {
	const { user } = useMe();

	const showButton = user && user.username !== username;
	const following = user && user.following.find(item => item.username === username);

	const text = following ? 'Unfollow' : 'Follow';

	return (
		showButton && (
			<Button
				className={`${text === 'Unfollow' ? 'bg-red-500' : 'bg-sky-500'}`}
				onClick={() => console.log('### Click Test...')}
			>
				{children}
			</Button>
		)
	);
}
