'use client';

import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';

import useMe from '../../hooks/useMe';
import Avatar from '../ui/Avatar';
import ScrollableBar from './ScrollableBar';

export default function FollowingBar() {
	const { user, isLoading } = useMe();
	const users = user?.following;

	return (
		<section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-scroll relative z-0">
			{isLoading ? (
				<PropagateLoader color="red" size={8} />
			) : (
				(!users || users.length === 0) && <p className="">You don&apos;n have following.</p>
			)}
			{users && users.length > 0 && (
				<ScrollableBar>
					{users.map(({ username, image }) => (
						<Link
							key={username}
							aria-label="User Profile"
							className="flex flex-col items-center w-20"
							href={`/user/${username}`}
						>
							<Avatar image={image} highlight size="lg" />
							<p className="w-full text-sm text-center text-ellipsis overflow-hidden">{username}</p>
						</Link>
					))}
				</ScrollableBar>
			)}
		</section>
	);
}
