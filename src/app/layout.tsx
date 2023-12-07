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
			<body className="w-full bg-neutral-50 overflow-auto">
				<AuthProvider>
					<header className="sticky top-0 bg-white z-10 border-b">
						<div className="max-w-screen-xl mx-auto">
							<Navbar />
						</div>
					</header>
					<main className="w-full flex justify-center">
						<SWRConfigProvider>{children}</SWRConfigProvider>
					</main>
				</AuthProvider>
			</body>
		</html>
	);
}
