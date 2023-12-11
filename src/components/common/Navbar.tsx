'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Avatar from '../ui/Avatar';
import ColorButton from '../ui/ColorButton';
import HomeFillIcon from '../ui/icons/HomeFillIcon';
import HomeIcon from '../ui/icons/HomeIcon';
import NewFillIcon from '../ui/icons/NewFillIcon';
import NewIcon from '../ui/icons/NewIcon';
import SearchFillIcon from '../ui/icons/SearchFillIcon';
import SearchIcon from '../ui/icons/SearchIcon';

const MENU_LIST = [
	{
		href: '/',
		icon: <HomeIcon />,
		checkedIcon: <HomeFillIcon />,
		title: 'Home'
	},
	{
		href: '/search',
		icon: <SearchIcon />,
		checkedIcon: <SearchFillIcon />,
		title: 'Search Users'
	},
	{
		href: '/new',
		icon: <NewIcon />,
		checkedIcon: <NewFillIcon />,
		title: 'New Post'
	}
];

export default function Navbar() {
	const pathName = usePathname();

	const { data: session } = useSession();
	const user = session?.user;

	const handleSignIn = () => {
		signIn();
	};

	const handleSignOut = () => {
		signOut();
	};

	return (
		<div className="flex justify-between items-center px-6">
			<Link aria-label="Home" href="/">
				<h1 className="text-3xl font-bold">Instagram</h1>
			</Link>
			<nav>
				<ul className="flex gap-4 items-center p-4">
					{MENU_LIST.map(menu => (
						<li key={menu.href}>
							<Link aria-label={menu.title} href={menu.href}>
								{pathName === menu.href ? menu.checkedIcon : menu.icon}
							</Link>
						</li>
					))}
					{user && (
						<li>
							<Link aria-label="User Profile" href={`/user/${user.username}`}>
								<Avatar image={user.image} highlight size="sm" />
							</Link>
						</li>
					)}
					<li>
						{session ? (
							<ColorButton onClick={handleSignOut}>Sign out</ColorButton>
						) : (
							<ColorButton onClick={handleSignIn}>Sign in</ColorButton>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
}
