'use client';

import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import type { ChildrenProps } from '../../@types/common';

const responsive: ResponsiveType = {
	desk: {
		breakpoint: { max: 4000, min: 576 },
		items: 6
	},
	mobile: {
		breakpoint: { max: 576, min: 0 },
		items: 5
	}
};

export default function ScrollableBar({ children }: ChildrenProps) {
	return (
		<Carousel containerClass="w-full flex gap-2" responsive={responsive}>
			{children}
		</Carousel>
	);
}
