'use client';

import useSWR from 'swr';

import type { ChildrenProps } from '../../@types/common';
import type { HomeUser, ProfileUser } from '../../@types/custom/user';
import Button from '../ui/Button';

type FollowButtonProps = ChildrenProps & {
	user: ProfileUser;
};

export default function FollowButton({ user, children }: FollowButtonProps) {
	const { username } = user;
	const { data: loggedInUser, error, isLoading } = useSWR<HomeUser>('/api/me');

	const showButton = loggedInUser && loggedInUser.username !== username;
	const following = loggedInUser && loggedInUser.following.find(item => item.username === username);

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
