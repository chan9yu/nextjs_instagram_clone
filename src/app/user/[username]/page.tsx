import { notFound } from 'next/navigation';

import UserProfile from '../../../components/user/UserProfile';
import { getUserForProfile } from '../../../services/user';

type UserDetailPageProps = {
	params: {
		username: string;
	};
};

export default async function UserDetailPage({ params: { username } }: UserDetailPageProps) {
	const user = await getUserForProfile(username);

	if (!user) {
		notFound();
	}

	return <UserProfile user={user} />;
}
