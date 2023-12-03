'use client';

import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';

import ColorButton from '../ui/ColorButton';

type SigninProps = {
	callbackUrl: string;
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

export default function Signin({ callbackUrl, providers }: SigninProps) {
	const handleSignin = (providerId: LiteralUnion<BuiltInProviderType, string>) => () => {
		signIn(providerId, { callbackUrl });
	};

	return (
		<>
			{Object.values(providers ?? {}).map(provider => (
				<ColorButton key={provider.id} size="lg" onClick={handleSignin(provider.id)}>
					Sign In with {provider.name}
				</ColorButton>
			))}
		</>
	);
}
