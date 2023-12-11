'use client';

import { useState } from 'react';

import type { ProfileUser } from '../../@types/custom/user';
import { TAB_TYPE } from '../../constants/user';
import CacheKeysContext from '../../contexts/CacheKeysContext';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import HeartIcon from '../ui/icons/HeartIcon';
import PostIcon from '../ui/icons/PostIcon';
import PostGrid from './PostGrid';

const tabs = [
	{
		icon: <PostIcon />,
		title: 'User posts',
		type: TAB_TYPE.POSTS
	},
	{
		icon: <BookmarkIcon className="w-3 h-3" />,
		title: 'Saved posts',
		type: TAB_TYPE.SAVED
	},
	{
		icon: <HeartIcon className="w-3 h-3" />,
		title: 'Liked posts',
		type: TAB_TYPE.LIKED
	}
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
				{tabs.map(({ icon, title, type }) => (
					<li
						className={`mx-12 p-4 cursor-pointer border-black ${type === tab && 'font-bold border-t'}`}
						key={type}
						onClick={handleClickTab(type)}
					>
						<button aria-label={title} className="scale-150 md:scale-100">
							{icon}
						</button>
						<span className="hidden md:inline">{type}</span>
					</li>
				))}
			</ul>
			<CacheKeysContext.Provider value={{ postsKey: `/api/users/${username}/${tab}` }}>
				<PostGrid />
			</CacheKeysContext.Provider>
		</section>
	);
}
