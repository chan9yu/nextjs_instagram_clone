import { createPortal } from 'react-dom';
import type { ChildrenProps } from '../../@types/common';

export default function ModalPortal({ children }: ChildrenProps) {
	if (typeof window === 'undefined') {
		return null;
	}

	return createPortal(children, document.body);
}
