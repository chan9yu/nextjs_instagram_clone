'use client';

import Link from 'next/link';
import HomeFillIcon from '../ui/icons/HomeFillIcon';
import HomeIcon from '../ui/icons/HomeIcon';
import NewFillIcon from '../ui/icons/NewFillIcon';
import NewIcon from '../ui/icons/NewIcon';
import SearchFillIcon from '../ui/icons/SearchFillIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import { usePathname } from 'next/navigation';
import ColorButton from '../ui/ColorButton';

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
					<ColorButton>Sign in</ColorButton>
				</ul>
			</nav>
		</div>
	);
}
