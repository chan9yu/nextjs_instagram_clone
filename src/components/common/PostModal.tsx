import { MouseEvent } from 'react';

import type { ChildrenProps } from '../../@types/common';
import CloseIcon from '../ui/icons/CloseIncon';

type PostModalProps = ChildrenProps & {
	onClose: () => void;
};

export default function PostModal({ onClose, children }: PostModalProps) {
	const handleModalClick = (e: MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<section
			className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
			onClick={handleModalClick}
		>
			<button className="fixed top-0 right-0 p-8 text-white" onClick={onClose}>
				<CloseIcon />
			</button>
			<div className="bg-white w-4/5 h-3/5 max-w-7xl">{children}</div>
		</section>
	);
}
