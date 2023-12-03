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
		checkedIcon: <HomeFillIcon />
	},
	{
		href: '/search',
		icon: <SearchIcon />,
		checkedIcon: <SearchFillIcon />
	},
	{
		href: '/new',
		icon: <NewIcon />,
		checkedIcon: <NewFillIcon />
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
			<Link href="/">
				<h1 className="text-3xl font-bold">Instagram</h1>
			</Link>
			<nav>
				<ul className="flex gap-4 items-center p-4">
					{MENU_LIST.map(menu => (
						<li key={menu.href}>
							<Link href={menu.href}>{pathName === menu.href ? menu.checkedIcon : menu.icon}</Link>
						</li>
					))}
					{user && (
						<li>
							<Link href={`/user/${user.username}`}>
								<Avatar image={user.image} />
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
