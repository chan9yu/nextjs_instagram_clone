import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import UserPosts from '../../../components/user/UserPosts';
import UserProfile from '../../../components/user/UserProfile';
import { getUserForProfile } from '../../../services/user';

type UserDetailPageProps = {
	params: {
		username: string;
	};
};

const getUser = cache(async (username: string) => getUserForProfile(username));

export async function generateMetadata({ params: { username } }: UserDetailPageProps): Promise<Metadata> {
	const user = await getUser(username);

	return {
		title: `${user?.name} (@${user?.username}) · Instagram Photos`,
		description: `${user?.name}'s all Instagram posts`
	};
}

export default async function UserDetailPage({ params: { username } }: UserDetailPageProps) {
	const user = await getUser(username);

	if (!user) {
		notFound();
	}

	return (
		<section className="w-full">
			<UserProfile user={user} />
			<UserPosts user={user} />
		</section>
	);
}
