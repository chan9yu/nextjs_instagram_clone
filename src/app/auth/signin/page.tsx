import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

import Signin from '../../../components/auth/Signin';
import { authOptions } from '../../../utils/auth';

type SigninPageProps = {
	searchParams: {
		callbackUrl: string;
	};
};

export const metadata: Metadata = {
	title: 'Signin',
	description: 'Signup or Login to Instagram'
};

export default async function SigninPage({ searchParams: { callbackUrl } }: SigninPageProps) {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect('/');
	}

	const providers = await getProviders();

	return (
		<section className="flex justify-center mt-24">
			<Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
		</section>
	);
}
