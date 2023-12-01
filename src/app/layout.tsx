import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import type { ChildrenProps } from '../@types/common';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'nextjs boiler plate',
	description: 'nextjs boiler plate repository',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon/favicon.ico'
		}
	]
};

export default function RootLayout({ children }: ChildrenProps) {
	return (
		<html lang="ko">
			<body className={openSans.className}>{children}</body>
		</html>
	);
}
