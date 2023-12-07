'use client';

import { SessionProvider } from 'next-auth/react';
import type { ChildrenProps } from '../@types/common';

export default function AuthProvider({ children }: ChildrenProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
