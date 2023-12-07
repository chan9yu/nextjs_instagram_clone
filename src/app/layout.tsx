import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import type { ChildrenProps } from '../@types/common';
import Navbar from '../components/common/Navbar';
import AuthProvider from '../providers/AuthProvider';
import SWRConfigProvider from '../providers/SWRConfigProvider';
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
		<html lang="ko" className={openSans.className}>
			<body className="w-full max-w-screen-xl overflow-auto mx-auto">
				<AuthProvider>
					<header className="sticky top-0 bg-white z-10 border-b">
						<Navbar />
					</header>
					<main className="w-full min-h-full flex justify-center bg-neutral-50">
						<SWRConfigProvider>{children}</SWRConfigProvider>
					</main>
				</AuthProvider>
			</body>
		</html>
	);
}
