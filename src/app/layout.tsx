import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="ko">
			<body className={inter.className}>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
