'use client';

import { useState } from 'react';

import type { ProfileUser } from '../../@types/custom/user';
import { TAB_TYPE } from '../../constants/user';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import HeartIcon from '../ui/icons/HeartIcon';
import PostIcon from '../ui/icons/PostIcon';
import PostGrid from './PostGrid';

const tabs = [
	{ type: TAB_TYPE.POSTS, icon: <PostIcon /> },
	{ type: TAB_TYPE.SAVED, icon: <BookmarkIcon className="w-3 h-3" /> },
	{ type: TAB_TYPE.LIKED, icon: <HeartIcon className="w-3 h-3" /> }
];

type UserPostsProps = {
	user: ProfileUser;
};

export default function UserPosts({ user: { username } }: UserPostsProps) {
	const [tab, setTab] = useState<TAB_TYPE>(TAB_TYPE.POSTS);

	const handleClickTab = (type: TAB_TYPE) => () => {
		setTab(type);
	};

	return (
		<section>
			<ul className="flex justify-center uppercase">
				{tabs.map(({ icon, type }) => (
					<li
						className={`mx-12 p-4 cursor-pointer border-black ${type === tab && 'font-bold border-t'}`}
						key={type}
						onClick={handleClickTab(type)}
					>
						<button className="scale-150 md:scale-100">{icon}</button>
						<span className="hidden md:inline">{type}</span>
					</li>
				))}
			</ul>
			<PostGrid tab={tab} username={username} />
		</section>
	);
}
