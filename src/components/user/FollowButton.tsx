'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

import type { ProfileUser } from '../../@types/custom/user';
import useMe from '../../hooks/useMe';
import Button from '../ui/Button';

type FollowButtonProps = {
	user: ProfileUser;
};

export default function FollowButton({ user: { id: targetId, username } }: FollowButtonProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	const isUpdating = isPending || isFetching;

	const { user: me, toggleFollow } = useMe();

	const showButton = me && me.username !== username;
	const following = me && me.following?.find(item => item.username === username);
	const text = following ? 'Unfollow' : 'Follow';

	const handleFollow = async () => {
		if (!me) return;
		setIsFetching(true);
		await toggleFollow(targetId, !following);
		setIsFetching(false);
		startTransition(() => {
			router.refresh();
		});
	};

	if (!showButton) {
		return null;
	}

	return (
		<div className="relative">
			{isUpdating && (
				<div className="absolute z-20 inset-0 flex justify-center items-center">
					<PulseLoader size={6} />
				</div>
			)}
			<Button
				className={`disabled:opacity-80 ${text === 'Unfollow' ? 'bg-red-500' : 'bg-sky-500'}`}
				onClick={handleFollow}
				disabled={isUpdating}
			>
				{text}
			</Button>
		</div>
	);
}
