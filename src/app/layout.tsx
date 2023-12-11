import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import type { ChildrenProps } from '../@types/common';
import Navbar from '../components/common/Navbar';
import AuthContext from '../contexts/AuthContext';
import SWRConfigContext from '../contexts/SWRConfigContext';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'Instagram Clone',
		template: 'Instagram Clone | %s'
	},
	description: 'Instagram Clone Photos',
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
				<AuthContext>
					<header className="sticky top-0 bg-white z-10 border-b">
						<div className="max-w-screen-xl mx-auto">
							<Navbar />
						</div>
					</header>
					<main className="w-full max-w-screen-xl flex justify-center mx-auto">
						<SWRConfigContext>{children}</SWRConfigContext>
					</main>
				</AuthContext>
			</body>
		</html>
	);
}
