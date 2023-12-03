'use client';

import { SessionProvider } from 'next-auth/react';
import type { ChildrenProps } from '../@types/common';

export default function AuthContext({ children }: ChildrenProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
